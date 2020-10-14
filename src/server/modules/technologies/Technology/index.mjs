import PrismaModule from '@prisma-cms/prisma-module'
import PrismaProcessor from '@prisma-cms/prisma-processor'

export class TechnologyProcessor extends PrismaProcessor {
  constructor(props) {
    super(props)

    this.objectType = 'Technology'

    this.private = true
    this.ownable = true
  }

  async create(method, args, info) {
    if (args.data) {
      let { ...data } = args.data

      args.data = data
    }

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

        // console.log("contentText", contentText);

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

export default class TechnologyModule extends PrismaModule {
  constructor(props = {}) {
    super(props)

    this.mergeModules([])
  }

  getProcessor(ctx) {
    return new (this.getProcessorClass())(ctx)
  }

  getProcessorClass() {
    return TechnologyProcessor
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
        technology: (source, args, ctx, info) => {
          return ctx.db.query.technology(args, info)
        },
        technologies: (source, args, ctx, info) => {
          return ctx.db.query.technologies(args, info)
        },
        technologiesConnection: (source, args, ctx, info) => {
          return ctx.db.query.technologiesConnection(args, info)
        },
      },
      Mutation: {
        ...Mutation,
        createTechnologyProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).createWithResponse(
            'Technology',
            args,
            info
          )
        },
        updateTechnologyProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).updateWithResponse(
            'Technology',
            args,
            info
          )
        },
        deleteTechnology: (source, args, ctx, info) => {
          return this.getProcessor(ctx).delete('Technology', args, info)
        },
      },
      Subscription: {
        ...Subscription,
        technology: {
          subscribe: async (parent, args, ctx, info) => {
            return ctx.db.subscription.technology({}, info)
          },
        },
      },
      TechnologyResponse: {
        data: (source, args, ctx, info) => {
          const { id } = source.data || {}

          return id
            ? ctx.db.query.technology(
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
