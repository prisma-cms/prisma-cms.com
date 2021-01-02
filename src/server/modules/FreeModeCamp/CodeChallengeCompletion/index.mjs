
import PrismaModule from "@prisma-cms/prisma-module";
import PrismaProcessor from "@prisma-cms/prisma-processor";


/**
 * Выполнение задания обучения
 */
export class CodeChallengeCompletionProcessor extends PrismaProcessor {

  constructor(props) {

    super(props);

    this.objectType = "CodeChallengeCompletion";

    this.private = true;

    this.ownable = true;
  }


  async create(method, args, info) {


    let {
      ...data
    } = args.data;

    const {
      currentUser,
    } = this.ctx;

    const {
      id: currentUserId,
    } = currentUser || {};

    if (!currentUserId) {
      throw new Error("Необходимо авторизоваться");
    }

    const user = await this.ctx.db.query.user({
      where: {
        id: currentUserId,
      },
    }, `
      {
        id
        # Проекты, по которым есть уроки
        ProjectsCreated (
          where: {
            type: Education
          }
        ){
          id
          name
        }
      }
    `);

    // console.log('user', JSON.stringify(user, undefined, 2));

    if (!user) {
      throw new Error("Не был получен пользователь");
    }

    const ProjectsCreated = user.ProjectsCreated;

    const codeChallengeCondition = args.data.CodeChallenge.connect;

    if (!codeChallengeCondition) {
      throw new Error("Не был получен идентификатор урока");
    }

    const codeChallenge = await this.ctx.db.query.codeChallenge({
      where: codeChallengeCondition,
    });

    if (!codeChallenge) {
      throw new Error("Не был получен урок");
    }

    // console.log('codeChallenge', JSON.stringify(codeChallenge, undefined, 2));


    /**
     * Check if codeChallengeCompletion exists
     */
    const exists = await this.ctx.db.exists.CodeChallengeCompletion({
      CreatedBy: {
        id: currentUserId,
      },
      CodeChallenge: codeChallengeCondition
    });

    if (exists) {
      throw new Error("CodeChallengeCompletion already exists");
    }


    const CreatedBy = {
      connect: {
        id: currentUserId,
      },
    }

    let Project;

    if (ProjectsCreated && ProjectsCreated.length) {
      Project = {
        connect: {
          id: ProjectsCreated[0].id,
        },
      };
    }
    else {
      Project = {
        create: {
          type: "Education",
          name: "Самообучение",
          CreatedBy,
        },
      };
    }

    const TaskProjects = {
      create: {
        CreatedBy,
        Project,
      },
    }

    args.data = {
      ...data,
      CodeChallenge: {
        connect: {
          id: codeChallenge.id,
        },
      },
      Task: {
        create: {
          name: `Выполнение задания "${codeChallenge.name}"`,
          status: "Progress",
          CreatedBy,
          TaskProjects,
          Timers: {
            create: {
              CreatedBy,
            },
          },
        },
      },
    };

    // console.log('data', JSON.stringify(data, undefined, 2));

    /**
     * Stop all active timers
     */

    await this.ctx.db.mutation.updateManyTimers({
      where: {
        stopedAt: null,
        CreatedBy: {
          id: currentUserId,
        },
      },
      data: {
        stopedAt: new Date(),
      },
    });

    return super.create(method, args, info);
  }


  async update(method, args, info) {

    if (args.data) {

      const {
        where,
      } = args;

      let {
        ...data
      } = args.data;


      /**
       * Если выполнено успешно, надо получить таску задания,
       * сменить статус на Выполнено и остановить таймер
       */
      if (data.success) {

        const codeChallengeCompletion = await this.ctx.db.query.codeChallengeCompletion({
          where,
        }, `{
          id
          Task {
            id
            status
            Timers (
              orderBy: createdAt_DESC
              first: 1
            ){
              id
              stopedAt
            }
          }
        }`);

        if (codeChallengeCompletion) {
          const task = codeChallengeCompletion.Task;

          if (task) {

            const [timer] = task.Timers || [];

            let Timers;

            if (timer && !timer.stopedAt) {
              Timers = {
                update: {
                  data: {
                    stopedAt: new Date(),
                  },
                  where: {
                    id: timer.id,
                  },
                },
              }
            }

            const Task = {
              update: {
                status: "Completed",
                Timers,
              },
            }

            Object.assign(data, {
              Task,
            });

          }

        }

      }

      args.data = data;
    }

    return super.update(method, args, info);
  }


  async mutate(method, args, info) {

    if (args.data) {

      let {
        ...data
      } = args.data;

      args.data = data;
    }

    return super.mutate(method, args);
  }



  async delete(method, args, info) {

    return super.delete(method, args);
  }
}


export default class CodeChallengeCompletionModule extends PrismaModule {

  constructor(props = {}) {

    super(props);

    this.mergeModules([
    ]);

  }


  getProcessor(ctx) {
    return new (this.getProcessorClass())(ctx);
  }


  getProcessorClass() {
    return CodeChallengeCompletionProcessor;
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
        // codeChallengeCompletion: (source, args, ctx, info) => {
        //   return ctx.db.query.codeChallengeCompletion(args, info);
        // },
        // codeChallengeCompletions: (source, args, ctx, info) => {
        //   return ctx.db.query.codeChallengeCompletions(args, info);
        // },
        // codeChallengeCompletionsConnection: (source, args, ctx, info) => {
        //   return ctx.db.query.codeChallengeCompletionsConnection(args, info);
        // },
      },
      Mutation: {
        ...Mutation,
        createCodeChallengeCompletionProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).createWithResponse("CodeChallengeCompletion", args, info);
        },
        updateCodeChallengeCompletionProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).updateWithResponse("CodeChallengeCompletion", args, info);
        },
        // deleteCodeChallengeCompletion: (source, args, ctx, info) => {
        //   return this.getProcessor(ctx).delete("CodeChallengeCompletion", args, info);
        // },
      },
      Subscription: {
        ...Subscription,
        // codeChallengeCompletion: {
        //   subscribe: async (parent, args, ctx, info) => {

        //     return ctx.db.subscription.codeChallengeCompletion({}, info);
        //   },
        // },
      },
      CodeChallengeCompletionResponse: {
        data: (source, args, ctx, info) => {

          const {
            id,
          } = source.data || {};

          return id ? ctx.db.query.codeChallengeCompletion({
            where: {
              id,
            },
          }, info) : null;
        },
      },
    }

  }

}