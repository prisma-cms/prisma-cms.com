import PrismaModule from '@prisma-cms/prisma-module'
import PrismaProcessor from '@prisma-cms/prisma-processor'

export class TechnologyLessonProcessor extends PrismaProcessor {
  constructor(props) {
    super(props)

    this.objectType = 'TechnologyLesson'

    this.private = true
    this.ownable = true
  }

  async create(method, args, info) {
    if (args.data) {
      let { name = null, ...data } = args.data

      Object.assign(data, {
        name,
      })

      args.data = data
    }

    return super.create(method, args, info)
  }

  async update(method, args, info) {
    if (args.data) {
      let { ...data } = args.data

      Object.assign(data, {})

      args.data = data
    }

    return super.update(method, args, info)
  }

  async mutate(method, args, info) {
    if (args.data) {
      let {
        name,
        components,

        /**
         * Этот параметр не должен передаваться
         */
        contentText,
        ...data
      } = args.data

      if (name !== undefined) {
        name = name ? name.trim() : null

        if (!name) {
          this.addFieldError('name', 'Не заполнено название')
        }
      }

      if (components !== undefined) {
        const contentText = this.reduceComponents(components, '')

        Object.assign(data, {
          contentText: contentText ? contentText : null,
        })
      }

      Object.assign(data, {
        name,
        components,
      })

      args.data = data
    }

    return super.mutate(method, args)
  }

  async delete(method, args, info) {
    return super.delete(method, args)
  }

  reduceComponents(components, text = '') {
    return this.ctx.reduceContentComponents(components, text)
  }
}

export default class TechnologyLessonModule extends PrismaModule {
  constructor(props = {}) {
    super(props)

    this.mergeModules([])
  }

  getProcessor(ctx) {
    return new (this.getProcessorClass())(ctx)
  }

  getProcessorClass() {
    return TechnologyLessonProcessor
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
        technologyLesson: (source, args, ctx, info) => {
          return ctx.db.query.technologyLesson(args, info)
        },
        technologyLessons: (source, args, ctx, info) => {
          return ctx.db.query.technologyLessons(args, info)
        },
        technologyLessonsConnection: (source, args, ctx, info) => {
          return ctx.db.query.technologyLessonsConnection(args, info)
        },
      },
      Mutation: {
        ...Mutation,
        createTechnologyLessonProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).createWithResponse(
            'TechnologyLesson',
            args,
            info
          )
        },
        updateTechnologyLessonProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).updateWithResponse(
            'TechnologyLesson',
            args,
            info
          )
        },
        deleteTechnologyLesson: (source, args, ctx, info) => {
          return this.getProcessor(ctx).delete('TechnologyLesson', args, info)
        },
      },
      Subscription: {
        ...Subscription,
        technologyLesson: {
          subscribe: async (parent, args, ctx, info) => {
            return ctx.db.subscription.technologyLesson({}, info)
          },
        },
      },
      TechnologyLessonResponse: {
        data: (source, args, ctx, info) => {
          const { id } = source.data || {}

          return id
            ? ctx.db.query.technologyLesson(
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
