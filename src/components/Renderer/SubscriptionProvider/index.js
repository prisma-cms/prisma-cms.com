import { Component } from 'react'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'

// import CooperationSubscriptionProvider from "@prisma-cms/cooperation/lib/components/SubscriptionProvider";

export default class SubscriptionProvider extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    loadApiData: PropTypes.func.isRequired,
    user: PropTypes.object,
  }

  static contextTypes = {}

  state = {
    subscriptions: [],
  }

  componentDidMount() {
    this.subscribe()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  async subscribe() {
    const {
      client,
      // loadApiData,
    } = this.props

    // const {
    //   localStorage,
    // } = this.context;

    await this.unsubscribe()

    const { subscriptions } = this.state

    // const subscribeUser = gql`
    //   subscription user{
    //     user{
    //       mutation
    //       node{
    //         id
    //       }
    //     }
    //   }
    // `;

    // const userSub = await client
    //   .subscribe({
    //     query: subscribeUser,
    //     variables: {
    //     },
    //   })
    //   .subscribe({
    //     next: async (data) => {

    //       await client.reFetchObservableQueries();

    //     },
    //     error(error) {
    //       console.error('subscribeCalls callback with error: ', error)
    //     },
    //   });

    // subscriptions.push(userSub);

    // const subscribeResource = gql`
    //   subscription resource{
    //     resource{
    //       mutation
    //       node{
    //         id
    //       }
    //     }
    //   }
    // `;

    // const resourceSub = await client
    //   .subscribe({
    //     query: subscribeResource,
    //     variables: {
    //     },
    //   })
    //   .subscribe({
    //     next: async (data) => {

    //       await client.reFetchObservableQueries();

    //     },
    //     error(error) {
    //       console.error('subscribeCalls callback with error: ', error)
    //     },
    //   });

    // subscriptions.push(resourceSub);

    // const subscribeEthTransaction = gql`
    //   subscription ethTransaction{
    //     ethTransaction{
    //       mutation
    //       node{
    //         id
    //       }
    //     }
    //   }
    // `;

    // const ethTransactionSub = await client
    //   .subscribe({
    //     query: subscribeEthTransaction,
    //     variables: {
    //     },
    //   })
    //   .subscribe({
    //     next: async (data) => {

    //       await loadApiData();

    //       await client.reFetchObservableQueries();

    //     },
    //     error(error) {
    //       console.error('subscribeCalls callback with error: ', error)
    //     },
    //   });

    // subscriptions.push(ethTransactionSub);

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
        next: async () => {
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
    const { client } = this.props

    if (!client.queryManager.fetchQueryRejectFns.size) {
      return await client.resetStore().catch((error) => {
        console.error(error)
      })
    }
  }

  render() {
    const { children } = this.props

    return children || null
  }
}
