

import PrismaModule from "@prisma-cms/prisma-module";

import UserModule, {
  UserPayload,
} from "@prisma-cms/user-module";

import MergeSchema from 'merge-graphql-schemas';

import path from 'path';
import chalk from "chalk";

const moduleURL = new URL(import.meta.url);

const __dirname = path.dirname(moduleURL.pathname);

const { fileLoader, mergeTypes } = MergeSchema;


export class ModxclubUserProcessor extends UserPayload {


  async signup(args, info) {

    let {
      data: {
        username,
        email,
        password,
      },
    } = args;


    if (!username) {
      this.addFieldError("username", "Не указан логин");
    }

    if (!email) {
      this.addFieldError("email", "Не указан емейл");
    }

    if (!password) {
      this.addFieldError("password", "Не указан пароль");
    }


    return super.signup(args, info);
  }


  async mutate(method, args, info) {

    let {
      data: {
        ethWalletPK: privateKey,
        ethWalletPKSendEmail,
        ...data
      },
      where,
      ...otherArgs
    } = args;


    const {
      db,
      web3,
    } = this.ctx;


    if (privateKey && where) {


      let account;

      if (!/^0x/.test(privateKey)) {
        return this.addFieldError("ethWalletPK", "Приватный ключ должен начинаться с 0x");
      }

      try {
        account = web3.eth.accounts.privateKeyToAccount(privateKey);
      }
      catch (error) {
        console.error(chalk.red("privateKeyToAccount Error"), error);
      }




      if (!account) {
        return this.addFieldError("ethWalletPK", "Приватный ключ не был дешифрован");
      }

      const {
        address: ethWallet,
      } = account;

      const user = await db.query.user({
        where,
      }, `{
        id
        email,
        EthAccounts(
          where: {
            type: Contract
          }
        ){
          id
          address
        },
      }`);

      if (!user) {
        return this.addError("Не был получен пользователь");
      }

      const {
        EthAccounts,
        email,
      } = user;

      /**
       * Если есть аккаунт, обновляем его.
       * Если нету, создаем новый
       */

      // if (EthAccounts && EthAccounts[0]) {

      //   // const {
      //   //   id,
      //   // } = EthAccounts[0];

      //   // Object.assign(data, {
      //   //   EthAccounts: {
      //   //     update: {
      //   //       where: {
      //   //         id,
      //   //       },
      //   //       data: {
      //   //         address: ethWallet,
      //   //       },
      //   //     },
      //   //   },
      //   // });

      //   return this.addError("Нельзя менять кошелек");

      // }
      // else {



      /**
       * Если пользователь указал отправить ему уведомление с паролем, отправляем
       */

      let LettersCreated;

      if (ethWalletPKSendEmail && email) {

        LettersCreated = {
          create: {
            rank: 100,
            email,
            subject: "Данные вашего кошелька",
            message: `
                <h3>
                  Данные вашего кошелька
                </h3>

                <p>
                  <strong>Адрес:</strong> ${ethWallet}
                </p>

                <p>
                  <strong>Приватный ключ:</strong> ${privateKey}
                </p>
              `,
          },
        }

      }

      const chainId = await web3.eth.net.getId();

      Object.assign(data, {
        EthAccounts: {
          create: {
            address: ethWallet,
            type: "Contract",
            chainId,
          },
        },
        LettersCreated,
      });

    }


    args = {
      ...otherArgs,
      where,
      data,
    }

    return super.mutate(method, args, info);
  }

}


class ModxclubUserModule extends UserModule {


  // constructor() {

  //   super();

  //   this.mergeModules([
  //     SocialModule,
  //   ]);

  // }

  // getApiSchema(types = []) {


  //   let apiSchema = super.getApiSchema(types, [
  //     "Mutation",

  //     "UserCreateInput",

  //     "ResourceCreateInput",
  //     "ResourceUpdateInput",
  //   ]);


  //   let schema = fileLoader(__dirname + '/schema/api/', {
  //     recursive: true,
  //   });

  //   apiSchema = mergeTypes([apiSchema.concat(schema)], { all: true });

  //   return apiSchema;

  // }

  async injectProjectLink(result, ctx) {


    const {
      success,
      data: user,
    } = result;

    if (success && user) {

      const {
        id: userId,
      } = user;


      if (!userId) {
        return;
      }

      const {
        getProjectFromRequest,
        db,
      } = ctx;

      const project = await getProjectFromRequest(ctx);

      // console.log("ctx project", project);

      if (project) {

        const {
          id: projectId,
        } = project;

        await db.mutation.updateProject({
          where: {
            id: projectId,
          },
          data: {
            PrismaUsers: {
              connect: {
                id: userId,
              },
            },
          },
        });

      }

    }

    return;
  }


  injectWhere(where) {

    let {
      search,
      ...other
    } = where || {};


    if (search !== undefined) {

      delete where.search;

      let condition;


      if (search) {


        condition = {
          OR: [
            {
              fullname_contains: search,
            },
            {
              username_contains: search,
            },
            {
              email_contains: search,
            },
          ],
        }


      }


      /**
       * Если объект условия пустой, то во избежание лишней вложенности
       * присваиваем ему полученное условие
       */
      if (!Object.keys(where).length) {

        Object.assign(where, condition);

      }

      /**
       * Иначе нам надо добавить полученное условие в массив AND,
       * чтобы объединить с другими условиями
       */
      else {

        if (!where.AND) {

          where.AND = [];

        }

        where.AND.push(condition);

      }

    }

    return where;

  }


  addQueryConditions(args, ctx, info) {

    const {
      modifyArgs,
    } = ctx;

    const {
      where,
    } = args;

    modifyArgs(where, this.injectWhere, info);

  }


  getResolvers() {


    let resolvers = super.getResolvers();

    const {
      Query: {
        users,
        usersConnection,
        ...Query
      },
      Mutation: {
        signup,
        updateUserProcessor,
        ...Mutation
      },
      ...other
    } = resolvers;



    return {
      ...other,
      Query: {
        ...Query,
        users: (source, args, ctx, info) => {

          this.addQueryConditions(args, ctx, info);

          return users(source, args, ctx, info);
        },
        usersConnection: (source, args, ctx, info) => {

          this.addQueryConditions(args, ctx, info);

          return usersConnection(source, args, ctx, info);
        },
      },
      Mutation: {
        ...Mutation,
        signup: async (source, args, ctx, info) => {

          const result = await new ModxclubUserProcessor(ctx).signup(args, info);

          await this.injectProjectLink(result, ctx);

          return result;
        },
        signin: async (source, args, ctx, info) => {

          // args = await this.injectProjectLink(args, ctx);

          const result = await new ModxclubUserProcessor(ctx).signin(args, info);

          // console.log("signin result", result);

          await this.injectProjectLink(result, ctx);

          return result;
        },
        updateUserProcessor: (source, args, ctx, info) => {

          // console.log("updateUserProcessor args", args);

          return new ModxclubUserProcessor(ctx).updateWithResponse("User", args, info);
        },
      },
      Subscription: {
        user: {
          subscribe: async (parent, args, ctx, info) => {

            return ctx.db.subscription.user({}, info);
          },
        },
      },
    };

  }


}


export default ModxclubUserModule;