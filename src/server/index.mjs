
import {
  modifyArgs,
  PrismaCmsServer,
  paginationMiddleware,
} from "@prisma-cms/server";

import {
  getProjectFromRequest,
} from "@prisma-cms/marketplace-module";
import CoreModule from "./modules";
// import permissions from './middleware/permissions';

import Web3 from "web3";

// import URI from "urijs";

import socketIO from '@prisma-cms/mc.js-module/src/modules/external/mc.js/server/src/lib/server/socketIO';

import dotenv from "dotenv";

import * as helpers from "./helpers";

dotenv.config();


const coreModule = new CoreModule({
});

const resolvers = coreModule.getResolvers();


const {
  SIGNUP_SET_NOTIFICATIONS,
  GethServer = "http://localhost:8545",
  MONGODB_URL,
  SendmailTest,
} = process.env;

if (!GethServer) {
  throw new Error("Env GethServer required");
}

// if (!MONGODB_URL) {
//   throw new Error("Env MONGODB_URL required");
// }

const web3 = new Web3(GethServer);
// web3.setProvider(new web3.providers.HttpProvider(GethServer));


/**
 * Получаем проект из запроса.
 * Это нужно для определения того, к какому конкретному проекту относится запрос
 */
// const getProjectFromRequest = async function (ctx) {

//   // console.log("ctx", ctx.request.headers);

//   const {
//     request: {
//       headers: {
//         origin,
//       },
//     },
//     db,
//   } = ctx;

//   if (!origin) {
//     return;
//   }

//   const uri = new URI(origin);

//   const domain = uri.domain();

//   if (!domain) {
//     return;
//   }

//   // console.log("ctx domain", domain);

//   return await db.query.project({
//     where: {
//       domain,
//     },
//   });
// }


// startServer({
//   typeDefs: 'src/schema/generated/api.graphql',
//   resolvers,
//   MailerProps: {
//     mailSender: "no-reply@prisma-cms.com",
//   },
//   contextOptions: {
//     web3,
//     getProjectFromRequest,
//     modifyArgs,
//     resolvers,
//   },
// });


class Server extends PrismaCmsServer {


  async beforeStart() {

    // console.log("this.db", this.db);

    socketIO(this.db);

    await super.beforeStart();

  }

}


const middlewares = [
  // permissions,
  paginationMiddleware,
];


const sendmailOptions = {};

if (SendmailTest === 'true') {
  Object.assign(sendmailOptions, {
    smtpPort: 1025,
    smtpHost: 'mail',
    devHost: 'mail',
  });
}


const startServer = async function () {

  const server = new Server({
    typeDefs: 'src/schema/generated/api.graphql',
    resolvers,
    middlewares,
    sendmailOptions,
    MailerProps: {
      mailSender: "no-reply@prisma-cms.com",
    },
    contextOptions: {
      ...helpers,
      web3,
      getProjectFromRequest,
      modifyArgs,
      resolvers,
      SIGNUP_SET_NOTIFICATIONS,
      MONGODB_URL,
    },
  });

  await server.startServer();

}

startServer();


