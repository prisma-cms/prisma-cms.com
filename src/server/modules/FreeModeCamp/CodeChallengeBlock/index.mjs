import PrismaModule from '@prisma-cms/prisma-module'
import PrismaProcessor from '@prisma-cms/prisma-processor'

export class CodeChallengeBlockProcessor extends PrismaProcessor {
  constructor(props) {
    super(props)

    this.objectType = 'CodeChallengeBlock'
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

export default class CodeChallengeBlockModule extends PrismaModule {
  constructor(props = {}) {
    super(props)

    this.mergeModules([])
  }

  getProcessor(ctx) {
    return new (this.getProcessorClass())(ctx)
  }

  getProcessorClass() {
    return CodeChallengeBlockProcessor
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
        codeChallengeBlock: (source, args, ctx, info) => {
          return ctx.db.query.codeChallengeBlock(args, info)
        },
        codeChallengeBlocks: (source, args, ctx, info) => {
          return ctx.db.query.codeChallengeBlocks(args, info)
        },
        codeChallengeBlocksConnection: (source, args, ctx, info) => {
          return ctx.db.query.codeChallengeBlocksConnection(args, info)
        },
      },
      Mutation: {
        ...Mutation,
        createCodeChallengeBlockProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).createWithResponse(
            'CodeChallengeBlock',
            args,
            info
          )
        },
        updateCodeChallengeBlockProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).updateWithResponse(
            'CodeChallengeBlock',
            args,
            info
          )
        },
        deleteCodeChallengeBlock: (source, args, ctx, info) => {
          return this.getProcessor(ctx).delete('CodeChallengeBlock', args, info)
        },
      },
      Subscription: {
        ...Subscription,
        codeChallengeBlock: {
          subscribe: async (parent, args, ctx, info) => {
            return ctx.db.subscription.codeChallengeBlock({}, info)
          },
        },
      },
      // CodeChallengeBlockResponse: {
      //   data: (source, args, ctx, info) => {

      //     const {
      //       id,
      //     } = source.data || {};

      //     return id ? ctx.db.query.codeChallengeBlock({
      //       where: {
      //         id,
      //       },
      //     }, info) : null;
      //   },
      // },
    }
  }
}
