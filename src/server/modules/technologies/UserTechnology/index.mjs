
import PrismaModule from "@prisma-cms/prisma-module";
import PrismaProcessor from "@prisma-cms/prisma-processor";

import moment from "moment";

export class UserTechnologyProcessor extends PrismaProcessor {

  constructor(props) {

    super(props);

    this.objectType = "UserTechnology";

    this.private = true;
    this.ownable = true;
  }


  async create(method, args, info) {

    if (args.data) {

      let {
        ...data
      } = args.data;

      args.data = data;

    }

    return super.create(method, args, info);
  }


  async update(method, args, info) {

    if (args.data) {

      let {
        ...data
      } = args.data;

      args.data = data;

    }

    return super.update(method, args, info);
  }


  async mutate(method, args, info) {

    const {
      db,
      currentUser,
    } = this.ctx;

    const {
      id: currentUserId,
    } = currentUser || {};

    if (args.data) {

      let {
        Technology,
        date_from,
        date_till,
        level,
        ...data
      } = args.data;


      const {
        where,
      } = args;


      const userTechnology_old = where ? await db.query.userTechnology({
        where,
      }) : null;

      // console.log("userTechnology_old", userTechnology_old);

      if(level !== undefined && level !== null) {
        if(typeof level !== "number") {
          throw new Error ("Should be Int from 0 to 5");
        }
        else if(level < 0) {
          throw new Error ("Should be not less that 0");
        }
        else if(level > 5) {
          throw new Error ("Should be not great that 5");
        }
      }

      if (Technology !== undefined) {

        const {
          connect,
        } = Technology;

        /**
         * Проверяем, чтобы у пользователя была только одна запись на одну технологию
         */
        if (connect) {

          const exist = await db.exists.UserTechnology({
            Technology: {
              ...connect,
            },
            CreatedBy: {
              id: currentUserId,
            },
          });

          // console.log("currentUserId", currentUserId);
          // console.log("exist", exist);

          if (exist) {
            this.addError("Данная технология уже указана у пользователя");
          }

        }

      }


      if (date_from !== undefined || date_till !== undefined) {

        const {
          date_from: date_from_old = null,
          date_till: date_till_old = null,
        } = userTechnology_old || {};


        const date_from_value = date_from !== undefined ? date_from : date_from_old;
        const date_till_value = date_till !== undefined ? date_till : date_till_old;


        // console.log("date_from_value", date_from_value);
        // console.log("date_till_value", date_till_value);


        if (date_from && moment(new Date(date_from)) > moment()) {

          this.addFieldError("date_from", "Дата С не может быть больше текущей даты");

        }


        if (date_till && moment(new Date(date_till)) > moment()) {

          this.addFieldError("date_till", "Дата До не может быть больше текущей даты");

        }


        if (date_from_value && date_till_value && moment(new Date(date_from_value)) > moment(new Date(date_till_value))) {

          this.addFieldError("date_from", "Дата С не может быть больше даты До");
          this.addFieldError("date_till", "Дата С не может быть больше даты До");
          
        }
        else if (date_till && !date_from_value) {
          this.addFieldError("date_till", "Не заполнена дата С");
          this.addFieldError("date_from", "Не заполнена дата С");
        }

      }


      Object.assign(data, {
        Technology,
        date_from,
        date_till,
        level,
      });

      args.data = data;

    }

    return super.mutate(method, args);
  }



  async delete(method, args, info) {

    return super.delete(method, args);
  }
}


export default class UserTechnologyModule extends PrismaModule {

  constructor(props = {}) {

    super(props);

    this.mergeModules([
    ]);

  }


  getProcessor(ctx) {
    return new (this.getProcessorClass())(ctx);
  }


  getProcessorClass() {
    return UserTechnologyProcessor;
  }


  getResolvers() {

    const {
      Query: {
        ...Query
      },
      Subscription: {
        ...Subscription
      },
      Mutation: {
        ...Mutation
      },
      ...other
    } = super.getResolvers();

    return {
      ...other,
      Query: {
        ...Query,
        userTechnology: (source, args, ctx, info) => {
          return ctx.db.query.userTechnology(args, info);
        },
        userTechnologies: (source, args, ctx, info) => {
          return ctx.db.query.userTechnologies(args, info);
        },
        userTechnologiesConnection: (source, args, ctx, info) => {
          return ctx.db.query.userTechnologiesConnection(args, info);
        },
      },
      Mutation: {
        ...Mutation,
        createUserTechnologyProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).createWithResponse("UserTechnology", args, info);
        },
        updateUserTechnologyProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).updateWithResponse("UserTechnology", args, info);
        },
        deleteUserTechnology: (source, args, ctx, info) => {
          return this.getProcessor(ctx).delete("UserTechnology", args, info);
        },
      },
      Subscription: {
        ...Subscription,
        userTechnology: {
          subscribe: async (parent, args, ctx, info) => {

            return ctx.db.subscription.userTechnology({}, info);
          },
        },
      },
      UserTechnologyResponse: {
        data: (source, args, ctx, info) => {

          const {
            id,
          } = source.data || {};

          return id ? ctx.db.query.userTechnology({
            where: {
              id,
            },
          }, info) : null;
        },
      },
    }

  }

}