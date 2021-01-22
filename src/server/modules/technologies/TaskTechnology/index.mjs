
import PrismaModule from "@prisma-cms/prisma-module";
import PrismaProcessor from "@prisma-cms/prisma-processor";


export class TaskTechnologyProcessor extends PrismaProcessor {

  constructor(props) {

    super(props);

    this.objectType = "TaskTechnology";

    this.ownable = true;
    this.private = true;
  }


  async create(method, args, info) {

    if(args.data) {

      let {
        ...data
      } = args.data;

      args.data = data;

    }

    return super.create(method, args, info);
  }


  async update(method, args, info) {

    if(args.data) {

      let {
        ...data
      } = args.data;

      args.data = data;

    }

    return super.update(method, args, info);
  }


  // TODO: Add check task access
  async mutate(method, args, info) {

    if(args.data) {

      let {
        level,
        ...data
      } = args.data;

      if(level !== undefined && level !== null) {
        if(typeof level !== "number") {
          throw new Error ("Should be Int from 1 to 5");
        }
        else if(level < 1) {
          throw new Error ("Should be not less that 1");
        }
        else if(level > 5) {
          throw new Error ("Should be not great that 5");
        }
      }

      Object.assign(data, {
        level,
      })

      args.data = data;
    }

    return super.mutate(method, args);
  }



  async delete(method, args, info) {

    return super.delete(method, args);
  }
}


export default class TaskTechnologyModule extends PrismaModule {

  constructor(props = {}) {

    super(props);

    this.mergeModules([
    ]);

  }


  getProcessor(ctx) {
    return new (this.getProcessorClass())(ctx);
  }


  getProcessorClass() {
    return TaskTechnologyProcessor;
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
        taskTechnology: (source, args, ctx, info) => {
          return ctx.db.query.taskTechnology(args, info);
        },
        taskTechnologies: (source, args, ctx, info) => {
          return ctx.db.query.taskTechnologies(args, info);
        },
        taskTechnologiesConnection: (source, args, ctx, info) => {
          return ctx.db.query.taskTechnologiesConnection(args, info);
        },
      },
      Mutation: {
        ...Mutation,
        createTaskTechnologyProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).createWithResponse("TaskTechnology", args, info);
        },
        updateTaskTechnologyProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).updateWithResponse("TaskTechnology", args, info);
        },
        deleteTaskTechnology: (source, args, ctx, info) => {
          return this.getProcessor(ctx).delete("TaskTechnology", args, info);
        },
      },
      Subscription: {
        ...Subscription,
        taskTechnology: {
          subscribe: async (parent, args, ctx, info) => {

            return ctx.db.subscription.taskTechnology({}, info);
          },
        },
      },
      TaskTechnologyResponse: {
        data: (source, args, ctx, info) => {

          const {
            id,
          } = source.data || {};

          return id ? ctx.db.query.taskTechnology({
            where: {
              id,
            },
          }, info) : null;
        },
      },
    }

  }

}