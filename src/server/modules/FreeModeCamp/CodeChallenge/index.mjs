import PrismaModule from '@prisma-cms/prisma-module'
import PrismaProcessor from '@prisma-cms/prisma-processor'

export class CodeChallengeProcessor extends PrismaProcessor {
  constructor(props) {
    super(props)

    this.objectType = 'CodeChallenge'
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
      let { ...data } = args.data

      args.data = data
    }

    return super.mutate(method, args)
  }

  async delete(method, args, info) {
    return super.delete(method, args)
  }
}

export default class CodeChallengeModule extends PrismaModule {
  constructor(props = {}) {
    super(props)

    this.mergeModules([])
  }

  getProcessor(ctx) {
    return new (this.getProcessorClass())(ctx)
  }

  getProcessorClass() {
    return CodeChallengeProcessor
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
        codeChallenge: (source, args, ctx, info) => {
          return ctx.db.query.codeChallenge(args, info)
        },
        codeChallenges: (source, args, ctx, info) => {
          return ctx.db.query.codeChallenges(args, info)
        },
        codeChallengesConnection: (source, args, ctx, info) => {
          return ctx.db.query.codeChallengesConnection(args, info)
        },
      },
      Mutation: {
        ...Mutation,
        createCodeChallengeProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).createWithResponse(
            'CodeChallenge',
            args,
            info
          )
        },
        updateCodeChallengeProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).updateWithResponse(
            'CodeChallenge',
            args,
            info
          )
        },
        deleteCodeChallenge: (source, args, ctx, info) => {
          return this.getProcessor(ctx).delete('CodeChallenge', args, info)
        },
      },
      Subscription: {
        ...Subscription,
        codeChallenge: {
          subscribe: async (parent, args, ctx, info) => {
            return ctx.db.subscription.codeChallenge({}, info)
          },
        },
      },
      // CodeChallengeResponse: {
      //   data: (source, args, ctx, info) => {

      //     const {
      //       id,
      //     } = source.data || {};

      //     return id ? ctx.db.query.codeChallenge({
      //       where: {
      //         id,
      //       },
      //     }, info) : null;
      //   },
      // },
    }
  }
}
