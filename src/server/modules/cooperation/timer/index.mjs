
import PrismaModule from "@prisma-cms/prisma-module";
import PrismaProcessor from "@prisma-cms/prisma-processor";


export class TimerProcessor extends PrismaProcessor {

  constructor(props) {

    super(props);

    this.objectType = "Timer";

    this.private = true;

  }


  async create(method, args, info) {

    let {
      data: {
        ...data
      },
    } = args;

    const CreatedBy = this.getCreatedBy();


    if (!CreatedBy) {
      return;
    }

    const {
      db,
      currentUser,
    } = this.ctx;

    const {
      id: currentUserId,
    } = currentUser;


    Object.assign(data, {
      ...CreatedBy,
    });


    /**
     * Получаем и завершаем запущенные таски, если имеются
     */
    const activeTimers = await db.query.timers({
      where: {
        CreatedBy: {
          id: currentUserId,
        },
        stopedAt: null,
      },
    });


    if (activeTimers && activeTimers.length) {

      activeTimers.map(async ({ id }) => {

        const args = {
          where: {
            id,
          },
          data: {
            stopedAt: new Date(),
          }
        };

        // await this.mutate("updateTimer", args);
        await db.mutation.updateTimer(args);

      });

    }


    // if(Task){
    //   Object.assign(Task, {

    //   });
    // }


    Object.assign(args, {
      data,
    });


    let result = await super.create(method, args, info);

    const {
      id: timerId,
    } = result || {}


    if (timerId) {
      let Timer = await this.query("timer", {
        where: {
          id: timerId,
        },
      }, `{
        id
        Task{
          id
          status
          startDate
        }
      }`);

      if (Timer) {

        const {
          id: taskId,
          status: taskStatus,
          startDate,
        } = Timer.Task || {};

        const taskData = {

        }

        /**
         * Выставляем статус
         */
        // if (!taskStatus || (["New", "Paused"].indexOf(taskStatus) !== -1)) {
        if (!taskStatus || taskStatus !== "Progress") {

          taskData.status = "Progress";

        }

        /**
         * Если в задаче не числится фактическая дата начала работ, выставляем
         */
        if (!startDate) {
          taskData.startDate = new Date();
        }

        /**
         * Если сформированы данные для обновления, обновляем таску
         */
        if (Object.keys(taskData).length > 0) {

          await db.mutation.updateTask({
            where: {
              id: taskId,
            },
            data: taskData,
          })
          .catch(console.error);

        }


      }

    }



    return result;
  }


  async mutate(method, args, info) {

    // let {
    //   data: { 
    //     ...data
    //   },
    // } = args;


    // Object.assign(data, { 
    // });


    // Object.assign(args, {
    //   data,
    // });

    return super.mutate(method, args);
  }



  getCreatedBy() {

    const {
      currentUser,
    } = this.ctx;

    if (!currentUser) {
      this.addError("Необходимо авторизоваться");
      return;
    }

    const {
      id,
    } = currentUser;

    return {
      CreatedBy: {
        connect: {
          id,
        },
      },
    }
  }

}



class TimerModule extends PrismaModule {


  getResolvers() {

    const resolvers = super.getResolvers();


    Object.assign(resolvers.Query, {
      timer: this.timer,
      timers: this.timers,
      timersConnection: this.timersConnection,
    });


    Object.assign(resolvers.Mutation, {
      createTimerProcessor: this.createTimerProcessor.bind(this),
      updateTimerProcessor: this.updateTimerProcessor.bind(this),
    });

    // Object.assign(resolvers.Subscription, this.Subscription);


    Object.assign(resolvers, {
      TimerResponse: this.TimerResponse(),

      Subscription: {
        timer: {
          subscribe: async (parent, args, ctx, info) => {

            return ctx.db.subscription.timer({}, info);
          },
        },
      },
    });

    return resolvers;
  }


  timers(source, args, ctx, info) {
    return ctx.db.query.timers(args, info);
  }

  timer(source, args, ctx, info) {
    return ctx.db.query.timer(args, info);
  }

  timersConnection(source, args, ctx, info) {
    return ctx.db.query.timersConnection(args, info);
  }


  getProcessor(ctx) {
    return new (this.getProcessorClass())(ctx);
  }

  getProcessorClass() {
    return TimerProcessor;
  }

  createTimerProcessor(source, args, ctx, info) {

    return this.getProcessor(ctx).createWithResponse("Timer", args, info);
  }

  updateTimerProcessor(source, args, ctx, info) {

    return this.getProcessor(ctx).updateWithResponse("Timer", args, info);
  }

  TimerResponse() {

    return {
      data: (source, args, ctx, info) => {

        const {
          id,
        } = source.data || {};

        return id ? ctx.db.query.timer({
          where: {
            id,
          },
        }, info) : null;
      }
    }
  }

}


export default TimerModule;