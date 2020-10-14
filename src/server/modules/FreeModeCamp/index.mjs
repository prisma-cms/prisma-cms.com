import PrismaModule from '@prisma-cms/prisma-module'

// import { MongoClient, ObjectID } from 'mongodb';
import MongoClient from 'mongodb'

import CodeChallengeBlockModule from './CodeChallengeBlock'
import CodeChallengeModule from './CodeChallenge'

export default class FreeModeCampModule extends PrismaModule {
  constructor(props = {}) {
    super(props)

    this.mergeModules([CodeChallengeBlockModule, CodeChallengeModule])
  }

  async fccImportChallengs(source, args, ctx, info) {
    const { MONGODB_URL, currentUser, db } = ctx

    const { sudo } = currentUser || {}

    if (!sudo) {
      throw new Error('Access denied')
    }

    return new Promise((resolve, reject) => {
      let result = null

      MongoClient.connect(
        `${MONGODB_URL}/freecodecamp`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        (err, client) => {
          if (err) {
            return reject(err)
          }

          // console.log('client', client);

          const mongo_db = client.db('freecodecamp')
          const challengeCollection = mongo_db.collection('challenge')

          // console.log('challengeCollection', challengeCollection);

          challengeCollection.find({}).toArray(async (err, docs) => {
            if (err) {
              return reject(err)
            }

            // let challengeTypes = []
            let superBlocks = []
            let blocks = []

            // console.log("Found the following records");

            // const insert = docs.splice(0, 100).map((n, index) => {
            const challenges = docs.map((n, index) => {
              const {
                _id,
                title: name,
                // challengeType,
                superBlock,
                block,
                // isRequired: required,
                template,
                order,
                superOrder,
                challengeOrder,
                challengeOrder: rank,
                ...other
              } = n

              const id = _id.toString()

              const externalKey = id

              if (superBlocks.findIndex((n) => n.name === superBlock) === -1) {
                superBlocks.push({
                  name: superBlock,
                  externalKey: superBlock,
                  rank: superOrder,
                  CreatedBy: {
                    connect: {
                      username: 'Fi1osof',
                    },
                  },
                })
              }

              if (blocks.findIndex((n) => n.name === block) === -1) {
                blocks.push({
                  name: block,
                  externalKey: block,
                  rank: order,
                  Parent: {
                    connect: {
                      externalKey: superBlock,
                    },
                  },
                })
              }

              return {
                ...other,
                id: id,
                externalKey,
                name,
                challengeOrder,
                order,
                superOrder,
                rank,
                // required,
                template: (template && template.trim()) || null,
                CreatedBy: {
                  connect: {
                    username: 'Fi1osof',
                  },
                },
                Block: {
                  connect: {
                    externalKey: block,
                  },
                },
              }
            })

            // return resolve({ superBlocks });

            // return resolve({
            //   doc: docs.pop(),
            //   superBlocks,
            //   blocks,
            // });

            /**
             * Insert SuperBlocks
             */

            await this.importBlocks(db, superBlocks)

            /**
             * Insert Blocks
             */

            await this.importBlocks(db, blocks)

            // return resolve({ superBlocks });

            // return resolve({
            //   doc: docs.pop(),
            //   superBlocks,
            //   blocks,
            // });

            /**
             * Insert challenges
             */
            // await Promise.all(challenges.splice(0, 3).map((data, index) => {
            await Promise.all(
              challenges.map((data, index) => {
                const { externalKey } = data

                return new Promise(async (resolve, reject) => {
                  await db.query
                    .codeChallenge({
                      where: {
                        id: externalKey,
                      },
                    })
                    .then(async (exists) => {
                      if (exists) {
                        return resolve(exists)
                      }

                      await db.mutation
                        .createCodeChallenge({
                          data,
                        })
                        .then((r) => {
                          // console.log('Insert result', r);

                          return resolve(r)
                        })
                        .catch((error) => {
                          // reject
                          console.error(
                            `Index ${index} error`,
                            error,
                            JSON.stringify(data, true, 2)
                          )

                          reject(error)
                        })
                    })
                    .catch(reject)
                })
              })
            ).then(
              (value) => {
                // console.log('result2', value);

                return value
              },
              (error) => {
                reject(error)
              }
            )

            // await Promise.all(insert)
            //   .then(value => {

            //     // console.log('result2', value);

            //     return value;
            //   }, error => {

            //     console.log('error', error);

            //     reject(error);
            //   });

            const doc = docs.pop()

            // console.log('doc', JSON.stringify(doc, true, 2))
            // callback(docs);

            result = {
              // challengeTypes,
              superBlocks,
              blocks,
              doc,
            }

            resolve(result)
          })
        }
      )
    })
  }

  async importBlocks(db, blocks) {
    return Promise.all(
      blocks.map((data, index) => {
        return new Promise(async (resolve, reject) => {
          const { externalKey } = data

          await db.query
            .codeChallengeBlock({
              where: {
                externalKey,
              },
            })
            .then(async (exists) => {
              if (exists) {
                return resolve(exists)
              }

              await db.mutation
                .createCodeChallengeBlock({
                  data,
                })
                .then((r) => {
                  // console.log('Insert result', r);

                  return resolve(r)
                })
                .catch((error) => {
                  // reject
                  console.error(
                    `Block ${index} error`,
                    error,
                    JSON.stringify(data, true, 2)
                  )

                  reject(error)
                })
            })
            .catch(reject)
        })
      })
    ).then(
      (value) => value,
      (error) => {
        console.error('Blocks error', error)
      }
    )
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
      },
      Mutation: {
        ...Mutation,
        fccImportChallengs: this.fccImportChallengs.bind(this),
      },
      Subscription: {
        ...Subscription,
      },
    }
  }
}
