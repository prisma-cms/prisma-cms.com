import PrismaModule from '@prisma-cms/prisma-module'
import PrismaProcessor from '@prisma-cms/prisma-processor'

export class TechnologyLessonUserProcessor extends PrismaProcessor {
  constructor(props) {
    super(props)

    this.objectType = 'TechnologyLessonUser'

    this.private = true
    this.ownable = true
  }

  async create(method, args, info) {
    const { db, currentUser } = this.ctx

    const { id: currentUserId } = currentUser || {}

    if (args.data) {
      let { Lesson, ...data } = args.data

      // if (Lesson !== undefined) {

      const { connect } = Lesson

      /**
       * Проверяем, чтобы у пользователя была только одна запись на одну технологию
       */
      if (connect) {
        const exist = await db.exists.TechnologyLessonUser({
          Lesson: {
            ...connect,
          },
          CreatedBy: {
            id: currentUserId,
          },
        })

        // console.log("currentUserId", currentUserId);
        // console.log("exist", exist);

        if (exist) {
          this.addError('Данный урок уже принят')
        }
      }

      // }

      Object.assign(data, {
        Lesson,
      })

      args.data = data
    }

    // return false;

    return super.create(method, args, info)
  }

  async update(method, args, info) {
    if (args.data) {
      let { ...data } = args.data

      args.data = data
    }

    return super.update(method, args, info)
  }

  async mutate(method, args, info) {
    if (args.data) {
      let {
        status,

        /**
         * Сбрасываем
         */
        completedAt,

        ...data
      } = args.data

      if (status) {
        switch (status) {
          case 'Completed':
            Object.assign(data, {
              completedAt: new Date(),
            })
            break

          default:
        }
      }

      Object.assign(data, {
        status,
      })

      args.data = data
    }

    // return new Promise((resolve, reject) => {

    //   setTimeout(reject, 3000);

    // });

    return super.mutate(method, args)
  }

  async delete(method, args, info) {
    return super.delete(method, args)
  }
}

export default class TechnologyLessonUserModule extends PrismaModule {
  constructor(props = {}) {
    super(props)

    this.mergeModules([])
  }

  getProcessor(ctx) {
    return new (this.getProcessorClass())(ctx)
  }

  getProcessorClass() {
    return TechnologyLessonUserProcessor
  }

  getResolvers() {
    const {
      Query: { ...Query },
      Subscription: { ...Subscription },
      Mutation: { ...Mutation },
      ...other
    } = super.getResolvers()

    return {
      ...other,
      Query: {
        ...Query,
        technologyLessonUser: (source, args, ctx, info) => {
          return ctx.db.query.technologyLessonUser(args, info)
        },
        technologyLessonUsers: (source, args, ctx, info) => {
          return ctx.db.query.technologyLessonUsers(args, info)
        },
        technologyLessonUsersConnection: (source, args, ctx, info) => {
          return ctx.db.query.technologyLessonUsersConnection(args, info)
        },
      },
      Mutation: {
        ...Mutation,
        createTechnologyLessonUserProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).createWithResponse(
            'TechnologyLessonUser',
            args,
            info
          )
        },
        updateTechnologyLessonUserProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).updateWithResponse(
            'TechnologyLessonUser',
            args,
            info
          )
        },
        deleteTechnologyLessonUser: (source, args, ctx, info) => {
          return this.getProcessor(ctx).delete(
            'TechnologyLessonUser',
            args,
            info
          )
        },
      },
      Subscription: {
        ...Subscription,
        technologyLessonUser: {
          subscribe: async (parent, args, ctx, info) => {
            return ctx.db.subscription.technologyLessonUser({}, info)
          },
        },
      },
      TechnologyLessonUserResponse: {
        data: (source, args, ctx, info) => {
          const { id } = source.data || {}

          return id
            ? ctx.db.query.technologyLessonUser(
                {
                  where: {
                    id,
                  },
                },
                info
              )
            : null
        },
      },
    }
  }
}
