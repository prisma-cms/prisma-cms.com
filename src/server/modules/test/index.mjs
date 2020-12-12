import PrismaModule from '@prisma-cms/prisma-module'
import PrismaProcessor from '@prisma-cms/prisma-processor'

import PrismaBinding from 'prisma-binding'

const { forwardTo } = PrismaBinding

class TestProcessor extends PrismaProcessor {
  async create(objectType, args, info) {
    const { currentUser } = this.ctx

    const { id: currentUserId } = currentUser || {}

    let {
      data: { ...data },
    } = args

    let CreatedBy

    if (currentUserId) {
      CreatedBy = {
        connect: {
          id: currentUserId,
        },
      }
    }

    Object.assign(data, {
      CreatedBy,
    })

    Object.assign(args, {
      data,
    })

    return super.create(objectType, args, info)
  }

  async mutate(method, args, info) {

    let { name, ...data } = args.data || {}

    if (name !== undefined) {
      name = name ? name.trim() : null

      if (!name) {
        this.addFieldError('name', 'This field is required')
      }
    }

    Object.assign(data, {
      name,
    })

    Object.assign(args, {
      data,
    })

    return super.mutate(method, args)
  }
}

class TestModule extends PrismaModule {
  constructor(props = {}) {
    super(props)

    // this.mergeModules([
    // ]);

    this.TestResponse = {
      data: (source, args, ctx, info) => {
        const { id } = (source && source.data) || {}

        return id
          ? ctx.db.query.test(
              {
                where: {
                  id,
                },
              },
              info
            )
          : null
      },
    }
  }

  getResolvers() {
    return {
      Query: {
        test: forwardTo('db'),
        tests: forwardTo('db'),
        testsConnection: forwardTo('db'),
      },
      Mutation: {
        createTestProcessor: (source, args, ctx, info) => {
          return new TestProcessor(ctx).createWithResponse('Test', args, info)
        },
        updateTestProcessor: (source, args, ctx, info) => {
          return new TestProcessor(ctx).updateWithResponse('Test', args, info)
        },
        deleteTest: forwardTo('db'),
        deleteManyTests: forwardTo('db'),
      },
      TestResponse: this.TestResponse,
    }
  }
}

export default TestModule
