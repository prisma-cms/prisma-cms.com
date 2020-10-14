import PrismaModule from '@prisma-cms/prisma-module'
import PrismaProcessor from '@prisma-cms/prisma-processor'

import moment from 'moment'

export class CareerProcessor extends PrismaProcessor {
  constructor(props) {
    super(props)

    this.objectType = 'Career'

    this.private = true
    this.ownable = true
  }

  async create(method, args, info) {
    const { currentUser, db } = this.ctx

    const { id: currentUserId } = currentUser || {}

    if (args.data) {
      let { name = null, start_date = null, ...data } = args.data

      /**
       * Проверяем есть ли уже у этого пользователя карьера
       */
      if (currentUserId) {
        const exists = await db.exists.Career({
          CreatedBy: {
            id: currentUserId,
          },
        })

        if (exists) {
          throw new Error('У вас уже имеется начатая карьера')
        }
      }

      Object.assign(data, {
        name,
        start_date,
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
      let { name, start_date, ...data } = args.data

      if (name !== undefined) {
        name = name ? name.trim() : null

        if (!name) {
          this.addFieldError('name', 'Не указана профессия')
        }
      }

      if (start_date !== undefined) {
        if (!start_date) {
          this.addFieldError('start_date', 'Не указана дата начала карьеры')
        } else {
          const data = moment(start_date)

          if (!data.isValid()) {
            this.addFieldError('start_date', 'Некорректная дата начала карьеры')
          } else if (data > moment()) {
            this.addFieldError(
              'start_date',
              'Дата начала карьеры не может быть больше текущей даты'
            )
          }
        }
      }

      Object.assign(data, {
        name,
        start_date,
      })

      args.data = data
    }

    return super.mutate(method, args)
  }

  async delete(method, args, info) {
    return super.delete(method, args)
  }
}

export default class CareerModule extends PrismaModule {
  constructor(props = {}) {
    super(props)

    this.mergeModules([])
  }

  getProcessor(ctx) {
    return new (this.getProcessorClass())(ctx)
  }

  getProcessorClass() {
    return CareerProcessor
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
        career: (source, args, ctx, info) => {
          return ctx.db.query.career(args, info)
        },
        careers: (source, args, ctx, info) => {
          return ctx.db.query.careers(args, info)
        },
        careersConnection: (source, args, ctx, info) => {
          return ctx.db.query.careersConnection(args, info)
        },
      },
      Mutation: {
        ...Mutation,
        createCareerProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).createWithResponse('Career', args, info)
        },
        updateCareerProcessor: (source, args, ctx, info) => {
          return this.getProcessor(ctx).updateWithResponse('Career', args, info)
        },
        deleteCareer: (source, args, ctx, info) => {
          return this.getProcessor(ctx).delete('Career', args, info)
        },
      },
      Subscription: {
        ...Subscription,
        career: {
          subscribe: async (parent, args, ctx, info) => {
            return ctx.db.subscription.career({}, info)
          },
        },
      },
      CareerResponse: {
        data: (source, args, ctx, info) => {
          const { id } = source.data || {}

          return id
            ? ctx.db.query.career(
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
