

// import PrismaModule from "@prisma-cms/prisma-module";

import ResourceModule, {
  ResourceProcessor,
} from "@prisma-cms/resource-module";

import MergeSchema from 'merge-graphql-schemas';

import path from 'path';
import chalk from "chalk";

const moduleURL = new URL(import.meta.url);

const __dirname = path.dirname(moduleURL.pathname);

const { fileLoader, mergeTypes } = MergeSchema;


export class ModxclubResourceProcessor extends ResourceProcessor {


  async create(method, args, info) {


    const {
      db,
    } = this.ctx;

    let {
      data: {
        blogID,
        topicID,
        parent,
        ...data
      },
    } = args;


    let {
      type,
    } = data;


    switch (type) {

      case "Topic":

        if (!blogID) {
          return this.addError("Не был указан ID блога");
        }
        else {

          // Проверяем есть ли такой топик
          const exists = await db.exists.Resource({
            id: blogID,
            type: "Blog",
          });

          if (!exists) {
            return this.addError("Не был получен блог");
          }
          else {
            Object.assign(data, {
              Blog: {
                connect: {
                  id: blogID,
                },
              },
            });
          }

        }

        break;

      case "Comment":

        /**
         * Пока что комментарии есть к топикам.
         * И топик и комментарий - это тип Resource.
         * Связь проходит через тип Thread.
         * Если для указанного топика нет еще Thread, значит создаем его.
         */


        const {
          contentText,
        } = this.prepareContent(args, data, method) || {};

        if (!contentText) {
          this.addFieldError("content", "Не заполнен текст");
        }
        else {

          let name = contentText.substr(0, 50) || "";


          if (!topicID) {
            return this.addError("Не был указан ID топика");
          }
          else {

            // Проверяем есть ли такой топик
            // const exists = await db.exists.Resource({
            //   id: topicID,
            //   type: "Topic",
            // });

            // Получаем топик
            const Topic = await db.query.resource({
              where: {
                id: topicID,
              },
            });

            if (!Topic) {
              return this.addError("Не был получен топик");
            }
            else {

              const {
                uri: TopicUri,
              } = Topic;

              Object.assign(data, {

                name,
                uri: `${TopicUri}/comments/${name}`,
                isfolder: false,

                CommentTarget: {
                  connect: {
                    id: topicID,
                  },
                },
              });
            }

          }

        }

        console.log(chalk.green("data"), data);

        // this.addFieldError("test", "Sdfsdf");

        break;

    }

    // let uriData = await this.prepareUri(args);

    // Object.assign(data, {
    //   ...uriData,
    //   ...this.getCreatedBy(),
    // });


    Object.assign(args, {
      data,
    });

    // return this.addFieldError("test", "error");

    return super.create(method, args, info);
  }

}


class ModxclubTopicModule extends ResourceModule {


  // constructor() {

  //   super();

  //   this.mergeModules([
  //     SocialModule,
  //   ]);

  // }

  getApiSchema(types = []) {


    let apiSchema = super.getApiSchema(types, [
    ]);


    let schema = fileLoader(__dirname + '/schema/api/', {
      recursive: true,
    });

    // console.log("schema", schema);

    apiSchema = mergeTypes([apiSchema.concat(schema)], { all: true });

    // console.log("apiSchema", apiSchema);

    return apiSchema;

  }



  getResolvers() {


    let resolvers = super.getResolvers();

    const {
      Mutation: {
        ...Mutation
      },
      ...other
    } = resolvers;



    return {
      Mutation: {
        ...Mutation,
        createBlogProcessor: (source, args, ctx, info) => {

          Object.assign(args.data, {
            type: "Blog",
          });

          return this.getProcessor(ctx).createWithResponse("Resource", args, info);
        },
        createTopicProcessor: (source, args, ctx, info) => {

          Object.assign(args.data, {
            type: "Topic",
          });

          return this.getProcessor(ctx).createWithResponse("Resource", args, info);
        },
        createCommentProcessor: (source, args, ctx, info) => {

          Object.assign(args.data, {
            type: "Comment",
          });

          return this.getProcessor(ctx).createWithResponse("Resource", args, info);
        },
      },
      ...other,
    };

  }


  getProcessorClass() {
    return ModxclubResourceProcessor;
  }

}


export default ModxclubTopicModule;