/* eslint-disable no-unreachable */


// import PrismaModule from "@prisma-cms/prisma-module";

import ResourceModule, {
  ResourceProcessor,
} from "@prisma-cms/resource-module";

import chalk from "chalk";
import UID from 'uid'
const uid = UID.uid;


export class PrismaCmsResourceProcessor extends ResourceProcessor {


  async create(method, args, info) {


    const {
      currentUser,
      db,
    } = this.ctx;

    const {
      id: currentUserId,
    } = currentUser || {};

    if (!currentUserId) {
      throw new Error("Необходимо авторизоваться");
    }


    let {
      data: {
        // blogID,
        topicID,
        parent,
        topic_tags,

        // Временно, так как у кого-нибудь могут закешироваться данные в браузере
        text: fake,
        ...data
      },
    } = args;


    let {
      id: newResourceId = uid(25),
      type,
      name,
    } = data;

    Object.assign(data, {
      id: newResourceId,
    });


    switch (type) {

      case "Blog":

        {

          this.prepareContent(args, data, method);

          // if (!contentText) {
          //   // this.addFieldError("content", "Не заполнен текст");
          //   this.addError("Не заполнен текст");
          //   return;
          // }

          const uri = `/blogs/${name}`;


          Object.assign(data, {
            uri,
            isfolder: true,
          });


          Object.assign(args, {
            data,
          });

          const result = await super.create(method, args, info);

          return result;
        }

        break;

      case "Topic":

        {

          const {
            contentText,
          } = this.prepareContent(args, data, method) || {};

          if (!contentText) {
            // this.addFieldError("content", "Не заполнен текст");
            // this.addError("Не заполнен текст");
            // return;
          }

          const uri = args.data.uri || `/topics/${name}`;

          // let connect;

          // let Blog;

          // if (blogID) {
          //   Blog = {
          //     connect: {
          //       id: blogID,
          //     },
          //   }
          // }
          // else {
          //   connect = {
          //     oldID: 637,
          //   };
          // }

          Object.assign(data, {
            uri,
            isfolder: false,
            // Blog,
          });


          Object.assign(args, {
            data,
          });


          // const result = await super.create(method, args, info);


          // const {
          //   id: topicID,
          //   name: topicName,
          //   uri: topicUri,
          // } = result || {};


          // /**
          //  * Если был создан топик, отправляем уведомления
          //  */
          // if (topicID) {

          //   let content;

          //   const siteUrl = "https://freecode.academy";

          //   if (contentText) {

          //     content = `
          //     <div>
          //       ${contentText.substr(0, 3000)}
          //     </div>
          //     `;
          //   }

          //   let subject = `Новый топик ${topicName}`;
          //   let message = `<p>
          //     <a href="${siteUrl}${topicUri}">${topicName}</a>.
          //   </p>
          //     ${content}
          //   `;

          //   const usersWhere = {
          //     id_not: currentUserId,
          //     NotificationTypes_some: {
          //       name: "new_topic",
          //     },
          //   }

          //   this.sendNotifications({ message, subject }, usersWhere);

          // }

          // return result;
        }

        break;


      case "Comment":
        {

          Object.assign(data, {
            // УРИ создаваемого комментария по-умолчанию (может быть переопределен ниже)
            uri: `/comments/${newResourceId}`,
            isfolder: false,
          });

          const {
            contentText,
          } = this.prepareContent(args, data, method) || {};

          if (!contentText) {
            // this.addFieldError("content", "Не заполнен текст");
            // this.addError("Не заполнен текст");
            // return;
          }

          // else 

          let name = (contentText && contentText.substr(0, 50)) || undefined;


          // if (!topicID) {
          //   return this.addError("Не был указан ID топика");
          // }
          // else {


          if (topicID) {

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
                name: topicName,
              } = Topic;


              if (!name) {
                name = `Комментарий к топику ${topicName}`;
              }

              Object.assign(data, {

                // name,
                // uri: `${TopicUri}/comments/${name}`,
                uri: `/comments/${TopicUri}/${name}`,
                isfolder: false,

                Topic: {
                  connect: {
                    id: topicID,
                  },
                },
              });

            }

          }
          else if (data.Task && data.Task.connect && data.Task.connect.id) {
            {
              const Task = await db.query.task({
                where: data.Task.connect,
              });

              if (!Task) {
                return this.addError("Не была получена задача");
              }

              const {
                name: taskName,
              } = Task;


              if (!name) {
                name = `Комментарий к задаче ${taskName}`;
              }
            }
          }
          // else {
          //   throw new Error ("Не указан родительский объект для комментария");
          // }


          if (name) {
            Object.assign(data, {
              name,
            });
          }


          Object.assign(args, {
            data,
          });

          // const result = await super.create(method, args, info);

          // const {
          //   id: commentId,
          // } = result || {};



          // /**
          //  * Если был создан комментарий, 
          //  */
          // if (commentId) {

          //   /**
          //    * Обновляем дату топика, чтобы сортировку актуализировать
          //    */
          //   await db.mutation.updateResource({
          //     data: {
          //       mockUpdate: new Date(),
          //     },
          //     where: {
          //       id: topicID,
          //     },
          //   })
          //     .catch(error => {
          //       /**
          //        * Не обламываем процесс, если не получилось обновить дату топика
          //        */
          //       this.error(error);
          //       console.error(chalk.red("Update Topic error"), error);
          //     });

          //   /**
          //    * отправляем уведомления
          //    */

          //   const siteUrl = "https://prisma-cms.com";

          //   let subject = `Новый комментарий в топике ${topicName}`;
          //   let message = `<p>
          //     В топике <a href="${siteUrl}${TopicUri}">${topicName}</a> создан новый комментарий.
          //   </p>
          //     <div>
          //       ${contentText.substr(0, 1000)}
          //     </div>
          //   `;

          //   const usersWhere = {
          //     id_not: currentUserId,
          //     Resources_some: {
          //       OR: [
          //         {
          //           id: topicID,
          //         },
          //         {
          //           Topic: {
          //             id: topicID,
          //           },
          //         },
          //       ],
          //     },
          //     NotificationTypes_some: {
          //       name_in: ["new_comment", "new_reply", "new_comments_in_my_topics"],
          //     },
          //   }

          //   this.sendNotifications({
          //     message,
          //     subject,
          //     rank: 100,
          //   }, usersWhere);

          // }

          // return result;

        }

        break;

      default: ;
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

    /**
     * Создаем объект
     */
    const result = await super.create(method, args, info);


    /**
     * Отправляем уведомления
     */
    this.createNotifications(result);


    return result;
  }



  prepareContent(args, data, method) {

    let {
      data: {
        // content,
        components,
      },
    } = args;


    if (components !== undefined) {

      let resourceBlocks = [];
      let entityMap = {};


      this.reduceBlocks(components, resourceBlocks, entityMap);


      let newContent = null;


      if (resourceBlocks.length) {

        newContent = {
          blocks: resourceBlocks,
          entityMap,
        }

      }


      Object.assign(data, {
        content: newContent,
        // contentText,
      });

      Object.assign(args.data, {
        ...data,
      });

    }


    return super.prepareContent(args, data, method);
  }


  reduceBlocks(components, resourceBlocks, entityMap, textLength = 0) {

    if (components && components.length) {


      components.map(n => {

        const {
          components: itemComponents,
          props,
        } = n || {};

        const {
          content,
        } = props || {};

        const {
          blocks,
          // entityMap: contentEntityMap,
        } = content || {};

        if (blocks && blocks.length) {

          // resourceBlocks = resourceBlocks.concat(blocks);

          blocks.map(block => {

            const {
              text,
            } = block;

            textLength += text ? text.length : 0;

            resourceBlocks.push(block);

            return null;
          });

        }

        this.reduceBlocks(itemComponents, resourceBlocks, entityMap, textLength);

        return null;
      });

    }

  }

  /**
   * Создаем и отправляем уведомления
   * @result: Resource
   */
  async createNotifications(result) {

    const {
      currentUser,
    } = this.ctx;

    const {
      id: currentUserId,
    } = currentUser;

    if (!currentUserId) {
      return;
    }

    /**
     * Получаем данные созданного объекта
     */
    const Resource = await this.ctx.db.query.resource({
      where: {
        id: result.id,
      },
    }, `{
      id
      type
      name
      uri
      contentText,
      CreatedBy {
        id
        username
      }
      Topic {
        id
        name
        uri
      }
      Task {
        id
        name
      }
    }`)
      .catch(console.error);

    if (Resource) {

      /**
       * отправляем уведомления
       */

      const siteUrl = "https://freecode.academy";

      const {
        // id: resourceId,
        uri: resourceUri,
        name: resourceName,
        contentText,
        type,
        Topic,
        Task,
      } = Resource

      switch (type) {

        case "Comment":

          if (Topic) {

            const {
              id: topicID,
              name: topicName,
              uri: TopicUri,
            } = Topic;

            let subject = `Новый комментарий в топике ${topicName}`;
            let message = `<p>
              В топике <a href="${siteUrl}${TopicUri}">${topicName}</a> создан новый комментарий.
            </p>
              <div>
                ${contentText.substr(0, 1000)}
              </div>
            `;

            /**
             * Получаем всех пользователей, которые написали топик
             * или комментарий в топике
             */
            const usersWhere = {
              id_not: currentUserId,
              Resources_some: {
                OR: [
                  {
                    id: topicID,
                  },
                  {
                    Topic: {
                      id: topicID,
                    },
                  },
                ],
              },
              NotificationTypes_some: {
                name_in: ["new_comment", "new_reply", "new_comments_in_my_topics"],
              },
            }

            this.sendNotifications({
              message,
              subject,
              rank: 100,
            }, usersWhere);

            return;
          }

          else if (Task) {

            const {
              id: taskId,
              name: taskName,
            } = Task;

            let subject = `Новый комментарий в задаче ${taskName}`;
            let message = `<p>
              В задаче <a href="${siteUrl}/tasks/${taskId}">${taskName}</a> создан новый <a href="${siteUrl}${resourceUri}">комментарий</a>.
            </p>
              <div>
                ${contentText.substr(0, 1000)}
              </div>
            `;

            const usersWhere = {
              id_not: currentUserId,
              OR: [
                {
                  // Админы
                  sudo: true,
                },
                {
                  // Кто создал проект для задачи
                  ProjectsCreated_some: {
                    ProjectTasks_some: {
                      Task: {
                        id: taskId
                      },
                    },
                  },
                },
                {
                  // Кто участвует в проекте задачи
                  Projects_some: {
                    Project: {
                      ProjectTasks_some: {
                        Task: {
                          id: taskId
                        },
                      },
                    },
                  },
                },
                {
                  // Кто создал задачу
                  TasksCreated_some: {
                    id: taskId
                  }
                },
                {
                  // Кто участвует в задаче
                  Tasks_some: {
                    Task: {
                      id: taskId
                    },
                  }
                },
                {
                  // Кто работал по задаче
                  Timers_some: {
                    Task: {
                      id: taskId
                    }
                  }
                },
                {
                  // Кто создавал какие-либо публикации к задаче (в том числе и комментарии)
                  Resources_some: {
                    Task: {
                      id: taskId
                    }
                  },
                },
              ],
              NotificationTypes_some: {
                name_in: ["new_comment", "new_reply", "new_comments_in_my_topics"],
              },
            }

            this.sendNotifications({
              message,
              subject,
              rank: 100,
            }, usersWhere);

            return;
          }

          break;


        case "Topic":

          {

            let content;


            if (contentText) {

              content = `
              <div>
                ${contentText.substr(0, 3000)}
              </div>
              `;
            }

            let subject = `Новый топик ${resourceName}`;
            let message = `<p>
              <a href="${siteUrl}${resourceUri}">${resourceName}</a>.
            </p>
              ${content}
            `;

            /**
             * Получаем всех пользователей, кроме текущего
             */
            const usersWhere = {
              id_not: currentUserId,
              NotificationTypes_some: {
                name: "new_topic",
              },
            }

            this.sendNotifications({ message, subject }, usersWhere);

          }

          break;

        default: ;
      }

    }


  }



  async update(method, args, info) {

    let {
      where,
      // ...other
    } = args;

    const {
      currentUser,
      db,
    } = this.ctx;

    const {
      id: currentUserId,
    } = currentUser || {};

    if (!currentUserId) {
      throw new Error("Необходимо авторизоваться");
    }

    const resource = await db.query.resource({
      where,
    }, `{
      id
      CreatedBy{
        id
      }
    }`);

    if (!resource) {
      throw new Error("Не был получен ресурс");
    }

    const {
      id: createdby,
    } = resource.CreatedBy || {};

    if (createdby !== currentUserId) {
      throw new Error("Нельзя редактировать чужой документ");
    }


    return super.update(method, args, info);
  }


  async sendNotifications(data, where) {

    const {
      ctx,
    } = this;

    const {
      db,
    } = ctx;

    const users = await db.query.users({
      where: {
        email_gt: "",
        ...where,
      }
    })
      .catch(error => {
        console.error(chalk.red("Error"), error);
      })
      ;


    const processor = this.getProcessor(data, users, this.writeEmail.bind(this));

    // eslint-disable-next-line no-unused-vars
    for await (const result of processor) {


    }

  }


  async * getProcessor(data, users, processor) {

    while (users && users.length) {

      const user = users.splice(0, 1)[0];


      const result = await processor(data, user)
        .catch(error => {



          this.error(error);
          return error;
        });


      yield result;
    }

    // await this.log(`Записано: ${writed}, пропущено: ${skiped}, ошибок: ${errors}`, "Info");

    // if (errors) {
    //   throw new Error("Есть ошибки при импорте");
    // }

  }

  async writeEmail(data, user) {

    const {
      db,
    } = this.ctx;

    const {
      email,
    } = user;

    const result = await db.mutation.createLetter({
      data: {
        // message,
        // subject,
        ...data,
        email,
      },
    })
      .catch(error => {

        console.error(chalk.red("writeEmail error"), error);

        this.error(error);
      });

    return result;
  }

}


export class TopicProcessor extends PrismaCmsResourceProcessor {


  prepareContent(args, data, method) {

    let {
      data: {
        // content,
        components,
      },
    } = args;


    if (components !== undefined) {

      let resourceBlocks = [];
      let entityMap = {};



      // if (components && components.length) {

      //   components.map(n => {

      //     const {
      //       content,
      //     } = n.props || {};

      //     const {
      //       blocks,
      //     } = content || {};

      //     if (blocks && blocks.length) {

      //       resourceBlocks = resourceBlocks.concat(blocks);

      //     }

      //   });

      // }

      this.reduceBlocks(components, resourceBlocks, entityMap);


      let newContent = null;


      if (resourceBlocks.length) {

        newContent = {
          blocks: resourceBlocks,
          entityMap,
        }

      }


      Object.assign(data, {
        content: newContent,
        // contentText,
      });

      Object.assign(args.data, {
        ...data,
      });

    }


    data = super.prepareContent(args, data, method);


    return data;
  }


  reduceBlocks(components, resourceBlocks, entityMap, textLength = 0) {

    if (components && components.length) {


      components.map(n => {

        const {
          components: itemComponents,
          props,
        } = n || {};

        const {
          content,
          text: contentText,
        } = props || {};

        if (contentText !== undefined) {

          textLength += contentText ? contentText.length : 0;

          resourceBlocks.push({
            text: contentText || "",
          });

        }
        else {
          const {
            blocks,
            // entityMap: contentEntityMap,
          } = content || {};

          if (blocks && blocks.length) {

            // resourceBlocks = resourceBlocks.concat(blocks);

            blocks.map(block => {

              const {
                text,
              } = block;

              textLength += text ? text.length : 0;

              resourceBlocks.push(block);

              return null;
            });

          }
        }

        this.reduceBlocks(itemComponents, resourceBlocks, entityMap, textLength);

        return null;
      });

    }

  }


  async mutate(method, args, info) {

    let {
      blogID,
      ...data
    } = args.data || {};

    let Blog;

    if (blogID) {
      Blog = {
        connect: {
          id: blogID,
        },
      }
    }


    Object.assign(data, {
      Blog,
    });


    Object.assign(args, {
      data,
    });

    return super.mutate(method, args, info);
  }

}


class TopicModule extends ResourceModule {


  // constructor() {

  //   super();

  //   this.mergeModules([
  //     SocialModule,
  //   ]);

  // }


  getSchema() {

    return;
  }


  getApiSchema(types = []) {


    return;

  }



  // injectWhereUnique(where) {

  //   let {
  //     uri,
  //   } = where || {};

  //   /**
  //    * Если указан ури, но не начинается со слеша, то добавляем слеш
  //    */
  //   if (uri && !uri.startsWith("/")) {
  //     where.uri = `/${uri}`;
  //   }

  //   return where;

  // }


  getResolvers() {


    let resolvers = super.getResolvers();

    const {
      Mutation: {
        ...Mutation
      },
      // Query: {
      //   resource,
      //   ...Query
      // },
      Resource,
      ...other
    } = resolvers;



    return {
      ...other,
      // Query: {
      //   ...Query,
      //   resource: async (source, args, ctx, info) => {

      //     const {
      //       modifyArgs,
      //     } = ctx;

      //     const {
      //       where,
      //     } = args;

      //     /**
      //      * Во фронт-редакторе пока что недоработка с обработкой УРЛов (точнее запросов от роутера,
      //      * нельзя задать path: ":uri", можно только path: "/:uri*"),
      //      * поэтому приходится добавлять в начало слеш, если не указан.
      //      */
      //     modifyArgs(where, this.injectWhereUnique, info);

      //     return resource(source, args, ctx, info);
      //   },
      // },
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

          // return this.getProcessor(ctx).createWithResponse("Resource", args, info);
          return new TopicProcessor(ctx).createWithResponse("Resource", args, info);
        },
        updateTopicProcessor: (source, args, ctx, info) => {

          // return this.getProcessor(ctx).updateWithResponse("Resource", args, info);
          return new TopicProcessor(ctx).updateWithResponse("Resource", args, info);
        },
        createCommentProcessor: (source, args, ctx, info) => {

          Object.assign(args.data, {
            type: "Comment",
          });

          return this.getProcessor(ctx).createWithResponse("Resource", args, info);
        },
        updateCommentProcessor: (source, args, ctx, info) => {

          return this.getProcessor(ctx).updateWithResponse("Resource", args, info);
        },
        updateBlogProcessor: (source, args, ctx, info) => {

          return this.getProcessor(ctx).updateWithResponse("Resource", args, info);
        },
      },
      Subscription: {
        resource: {
          subscribe: async (parent, args, ctx, info) => {

            return ctx.db.subscription.resource({}, info);
          },
        },
      },
      Resource: {
        ...Resource,

        /**
         * Так как ввели новое поле components, если оно заполнено, 
         * то поле content не выводим в целях экономии ресурсов
         */
        content: (source, args, ctx, info) => {

          const {
            content,
            components,
          } = source || {};

          return components ? null : Resource && Resource.content ? Resource.content(source, args, ctx, info) : content;
        },
        // Comments: (source, args, ctx, info) => {

        //   const {
        //     id,
        //     Comments,
        //   } = source;

        //   return id ? ctx.db.query.resources({
        //     where: {
        //       Topic: {
        //         id,
        //       },
        //     },
        //   }, info)
        //     : Comments;
        // },

        /**
         * Для обратной совместимости, потому что CommentTarget переименовалось в Topic
         */
        CommentTarget: async (source, args, ctx, info) => {

          const {
            id: commentId,
            CommentTarget,
            // Topic,
          } = source;

          let result = null;

          if (CommentTarget !== undefined) {
            result = CommentTarget;
          }

          else if (commentId) {

            const [topic] = await ctx.db.query.resources({
              first: 1,
              where: {
                Comments_some: {
                  id: commentId,
                },
              },
            }, info);

            result = topic;

          }

          return result;

        },
      },
    };

  }


  getProcessorClass() {
    return PrismaCmsResourceProcessor;
  }

}


export default TopicModule;