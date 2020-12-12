import PrismaModule from '@prisma-cms/prisma-module'
import PrismaProcessor from '@prisma-cms/prisma-processor'
// import chalk from "chalk";

export class CommentProcessor extends PrismaProcessor {
  constructor(props) {
    super(props)

    this.objectType = 'Comment'

    this.private = true
    this.ownable = true
  }

  async create(method, args, info) {
    if (args.data) {
      let { TechnologyLesson, ...data } = args.data

      if (TechnologyLesson !== undefined) {
        const { connect } = TechnologyLesson || {}

        if (!connect) {
          throw new Error('Не указан урок')
        }
      }

      Object.assign(data, {
        TechnologyLesson,
      })

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
        components,

        /**
         * Этот параметр не должен передаваться
         */
        contentText,

        ...data
      } = args.data

      if (components !== undefined) {
        const contentText = this.reduceComponents(components, '')

        Object.assign(data, {
          contentText: contentText ? contentText : null,
        })
      }

      Object.assign(data, {
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

export default class CommentModule extends PrismaModule {
  constructor(props = {}) {
    super(props)

    this.mergeModules([])
  }

  getProcessor(ctx) {
    return new (this.getProcessorClass())(ctx)
  }

  getProcessorClass() {
    return CommentProcessor
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
        comment: (source, args, ctx, info) => {
          return ctx.db.query.comment(args, info)
        },
        comments: (source, args, ctx, info) => {
          return ctx.db.query.comments(args, info)
        },
        commentsConnection: (source, args, ctx, info) => {
          return ctx.db.query.commentsConnection(args, info)
        },
      },
      Mutation: {
        ...Mutation,
        // createCommentProcessor: (source, args, ctx, info) => {
        //   return this.getProcessor(ctx).createWithResponse("Comment", args, info);
        // },
        // updateCommentProcessor: (source, args, ctx, info) => {
        //   return this.getProcessor(ctx).updateWithResponse("Comment", args, info);
        // },
        // deleteComment: (source, args, ctx, info) => {
        //   return this.getProcessor(ctx).delete("Comment", args, info);
        // },
        createTechnologyLessonCommentProcessor: (source, args, ctx, info) => {
          const { TechnologyLesson = {} } = args.data

          Object.assign(args.data, {
            TechnologyLesson,
          })

          return this.getProcessor(ctx).createWithResponse(
            'Comment',
            args,
            info
          )
        },
        updateTechnologyLessonCommentProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).updateWithResponse(
            'Comment',
            args,
            info
          )
        },
      },
      Subscription: {
        ...Subscription,
        comment: {
          subscribe: async (parent, args, ctx, info) => {
            return ctx.db.subscription.comment({}, info)
          },
        },
      },
      CommentResponse: {
        data: (source, args, ctx, info) => {
          const { id } = source.data || {}

          return id
            ? ctx.db.query.comment(
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
