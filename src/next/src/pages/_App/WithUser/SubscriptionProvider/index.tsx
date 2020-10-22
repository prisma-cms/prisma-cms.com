import { Component } from 'react'

import gql from 'graphql-tag'
import { SubscriptionProviderProps, SubscriptionProviderState } from './interfaces'

// import CooperationSubscriptionProvider from "@prisma-cms/cooperation/lib/components/SubscriptionProvider";

export default class SubscriptionProvider extends Component<SubscriptionProviderProps, SubscriptionProviderState> {

  state = {
    subscriptions: [],
  } as SubscriptionProviderState;

  componentDidMount() {
    this.subscribe()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  async subscribe() {

    const {
      client,
    } = this.props

    /**
     * На стороне сервера нам не нужны подписки, поэтому четко
     * контролируем серверная это сторона или клиентская
     */
    const wsAllowed = typeof window !== "undefined";

    if (!wsAllowed) {
      return;
    }


    await this.unsubscribe()

    const { subscriptions } = this.state

    const subscribeComment = gql`
      subscription comment {
        comment {
          mutation
          node {
            id
          }
        }
      }
    `

    const commentSub = await client
      .subscribe({
        query: subscribeComment,
        variables: {},
      })
      .subscribe({
        next: async (data) => {

          // eslint-disable-next-line no-console
          console.log("commentSub next data", data);

          await this.resetStore()
        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      })

    subscriptions.push(commentSub)

    const subscribeTechnology = gql`
      subscription technology {
        technology {
          mutation
          node {
            id
          }
        }
      }
    `

    const technologySub = await client
      .subscribe({
        query: subscribeTechnology,
        variables: {},
      })
      .subscribe({
        next: async () => {
          await this.resetStore()
        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      })

    subscriptions.push(technologySub)

    const subscribeUserTechnology = gql`
      subscription userTechnology {
        userTechnology {
          mutation
          node {
            id
          }
        }
      }
    `

    const userTechnologySub = await client
      .subscribe({
        query: subscribeUserTechnology,
        variables: {},
      })
      .subscribe({
        next: async () => {
          await this.resetStore()
        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      })

    subscriptions.push(userTechnologySub)

    const subscribeCareer = gql`
      subscription career {
        career {
          mutation
          node {
            id
          }
        }
      }
    `

    const careerSub = await client
      .subscribe({
        query: subscribeCareer,
        variables: {},
      })
      .subscribe({
        next: async () => {
          await this.resetStore()
        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      })

    subscriptions.push(careerSub)

    const subscribeTechnologyLesson = gql`
      subscription technologyLesson {
        technologyLesson {
          mutation
          node {
            id
          }
        }
      }
    `

    const technologyLessonSub = await client
      .subscribe({
        query: subscribeTechnologyLesson,
        variables: {},
      })
      .subscribe({
        next: async () => {
          await this.resetStore()
        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      })

    subscriptions.push(technologyLessonSub)

    const subscribeTechnologyLessonUser = gql`
      subscription technologyLessonUser {
        technologyLessonUser {
          mutation
          node {
            id
          }
        }
      }
    `

    const technologyLessonUserSub = await client
      .subscribe({
        query: subscribeTechnologyLessonUser,
        variables: {},
      })
      .subscribe({
        next: async () => {
          await this.resetStore()
        },
        error(error) {
          console.error('subscribeCalls callback with error: ', error)
        },
      })

    subscriptions.push(technologyLessonUserSub)

    this.setState({
      subscriptions,
    })
  }

  unsubscribe() {
    return new Promise((resolve) => {
      const { subscriptions } = this.state

      if (subscriptions && subscriptions.length) {
        subscriptions.map((n) => {
          n.unsubscribe()
        })

        Object.assign(this.state, {
          subscriptions: [],
        })
      }

      resolve()
    })
  }

  async resetStore() {

    // eslint-disable-next-line no-console
    console.log('SubscriptionProvider resetStore');

    const { client } = this.props

    if (client["queryManager"].fetchCancelFns.size === 0) {
      // TODO https://github.com/apollographql/apollo-client/issues/2919#issuecomment-719972118
      // Подавляем ошибку, так как аполло не дает возможности проверять,
      // что обновление уже выполняется
      return await client.resetStore()
        .catch(console.warn)
    }

  }

  render() {
    const { children } = this.props

    return children || null
  }
}
