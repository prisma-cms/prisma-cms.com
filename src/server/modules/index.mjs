
import fs from "fs";

import PrismaModule from "@prisma-cms/prisma-module";

// import ImportModule from "@modxclub/import-old-site";

import LogModule from "@prisma-cms/log-module";
import MailModule from "@prisma-cms/mail-module";
import UploadModule, {
  Modules as UploadModules,
} from "@prisma-cms/upload-module";
import RouterModule from "@prisma-cms/router-module";
import SocietyModule, {
  Modules as SocietyModules,
} from "@prisma-cms/society-module";
import EthereumModule, {
  Modules as EthereumModules,
} from "@prisma-cms/ethereum-module";
import WebrtcModule from "@prisma-cms/webrtc-module";
import MarketplaceModule from "@prisma-cms/marketplace-module";
// import CooperationModule from "@prisma-cms/cooperation-module";

import McJSModule from "@prisma-cms/mc.js-module";

import UserModule from "./user";
import ResourceModule from "./resource";
import BlogModule from "./blog";
import CooperationModule from "./cooperation";
import TestModule from "./test";
import Technology from "./technologies/Technology";
import UserTechnology from "./technologies/UserTechnology";
import TechnologyLesson from "./technologies/TechnologyLesson";
import Career from "./technologies/Career";
import TechnologyLessonUser from "./technologies/TechnologyLessonUser";
import Comment from "./Comment";
// import Gallery from "./Gallery";
// import GalleryFile from "./GalleryFile";
import FreeModeCampModule from "./FreeModeCamp";
import CodeChallengeCompletionModule from "./FreeModeCamp/CodeChallengeCompletion";


import chalk from 'chalk';

import { parse, print } from "graphql";

import URI from "urijs";

import MergeSchema from 'merge-graphql-schemas';
import path from 'path';
const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);
const { fileLoader, mergeTypes } = MergeSchema;


class CoreModule extends PrismaModule {


  constructor(options) {

    super(options);

    this.mergeModules([
      McJSModule,
      MarketplaceModule,
      // CooperationModule,
      LogModule,
      MailModule,
      UploadModule,
      SocietyModule,
      EthereumModule,
      // ImportModule,
      WebrtcModule,

      // /**
      //  * Важно кастомные классы в последнюю очередь использовать.
      //  * Но надо будет вообще вывести базовые кслассы в отдельный загрузчик
      //  */
      ResourceModule,
      BlogModule,
      CooperationModule,
      TestModule,
      UserModule,
      RouterModule,
      Technology,
      TechnologyLesson,
      UserTechnology,
      TechnologyLessonUser,
      Career,

      /**
       * Конфликтный объект, потому что используются уже ресурсы-комментарии
       * и инпуты CommentCreateInput и CommentUpdateInput
       */
      Comment,

      // Gallery,
      // GalleryFile,
      FreeModeCampModule,
      CodeChallengeCompletionModule,
    ]
      .concat(
        EthereumModules,
        SocietyModules,
        UploadModules,
      )
      .concat([
        UserModule,
      ])
    );

  }


  getSchema(types = []) {

    let schema = super.getSchema(types);

    // schema = this.cleanupApiSchema(schema, [
    //   'Resource',
    // ]);

    let customSchema = fileLoader(__dirname + '/schema/database/', {
      recursive: true,
    });

    if (customSchema) {
      schema = mergeTypes([schema].concat(customSchema), { all: true });
    }

    return schema;
  }


  getApiSchema(types = []) {

    let baseSchema = [];

    let schemaFile = __dirname + "/../../schema/generated/prisma.graphql";

    if (fs.existsSync(schemaFile)) {
      baseSchema = fs.readFileSync(schemaFile, "utf-8");

      baseSchema = this.cleanupApiSchema(baseSchema, [
        // // Cooperation
        // "ProjectCreateInput",
        // "ProjectUpdateInput",
        // "TaskCreateInput",
        // "TaskUpdateInput",
        // "TimerCreateInput",
        // "TimerUpdateInput",

        // "TaskReactionCreateInput",
        // // "TaskReactionUpdateInput",
        // "TaskCreateOneInput",
        // "TaskUpdateOneInput",

        // "ProjectMemberCreateInput",
        // "ProjectMemberUpdateInput",
        // "ProjectCreateOneWithoutMembersInput",
        // "UserCreateOneWithoutProjectsInput",
        // "ServiceCreateManyWithoutProjectsInput",
        // "ServiceUpdateManyWithoutProjectsInput",

        // "TeamCreateInput",
        // "TeamUpdateInput",
        // "TeamCreateOneWithoutChildsInput",
        // "TeamCreateManyWithoutParentInput",
        // "TeamMemberCreateManyWithoutTeamInput",
        // "ProjectCreateManyWithoutTeamInput",
        // "TeamUpdateOneWithoutChildsInput",
        // "TeamUpdateManyWithoutParentInput",
        // "TeamMemberUpdateManyWithoutTeamInput",
        // "ProjectUpdateManyWithoutTeamInput",

        // "TeamMemberCreateInput",
        // "TeamMemberUpdateInput",
        // "TeamCreateOneWithoutMembersInput",
        // "UserCreateOneWithoutTeamsInput",

        // "PositionCreateInput",
        // "PositionUpdateInput",
        // "UserCreateManyWithoutPositionsInput",
        // "UserUpdateManyWithoutPositionsInput",

        // "ServiceCreateInput",
        // // Eof Cooperation

        // "ResourceCreateInput",
        // "ResourceUpdateInput",
        // "ResourceCreateOneWithoutChildsInput",
        // "ResourceCreateManyWithoutParentInput",
        // "UserUpdateOneWithoutResourcesInput",
        // "ResourceUpdateOneWithoutChildsInput",
        // "ResourceUpdateManyWithoutParentInput",
        // "ResourceUpdateManyWithoutCreatedByInput",
        // "ResourceCreateManyWithoutCreatedByInput",
        // "FileCreateOneWithoutImageResourceInput",
        // "FileUpdateOneWithoutImageResourceInput",

        "ChatRoomCreateInput",
        "ChatRoomUpdateInput",
        "UserCreateManyWithoutRoomsInput",
        "UserUpdateManyWithoutRoomsInput",

        "ChatMessageCreateInput",
        "ChatMessageUpdateInput",
        "ChatRoomCreateOneWithoutMessagesInput",

        "ChatMessageReadedCreateInput",
        "ChatMessageCreateOneWithoutReadedByInput",

        // "CallRequestCreateInput",
        "CallRequestUpdateDataInput",
        "ChatRoomCreateOneWithoutCallRequestsInput",
        "ChatRoomUpdateOneWithoutCallRequestsInput",

        "EthContractSourceCreateInput",
        "EthContractSourceUpdateInput",
        "EthTransactionCreateInput",
        "EthAccountCreateInput",
        "EthAccountUpdateInput",
        "EthTransactionSubscriptionPayload",

        "PlayerCreateInput",
        "SettingsCreateInput",
        "SettingsUpdateInput",
        "CareerCreateInput",
        "CareerUpdateInput",

        "CommentCreateInput",
        "CommentUpdateInput",

        "CodeChallengeCompletionCreateInput",
        "CodeChallengeCompletionUpdateInput",

        /**
         * prisma-3.14
         */
        // "ChatMessageReadedUpdateInput",
        // "ChatMessageReadedUpdateWithoutMessageDataInput",
        // "ChatMessageReadedUpdateWithoutUserDataInput",
        // "ChatRoomInvitationUpdateInput",
        // "ChatRoomInvitationUpdateWithoutChatRoomDataInput",
        // "ChatRoomInvitationUpdateWithoutNoticeDataInput",
        // "ChatRoomUpdateWithoutInvitationsDataInput",
        // "ChatRoomUpdateWithoutMembersDataInput",
        // "ChatRoomUpdateWithoutMessagesDataInput",
        // "ChatRoomUpdateWithoutProjectDataInput",
        // "ChatRoomUpdateWithoutTaskDataInput",
        // "FileUpdateInput",
        // "FileUpdateWithoutImageResourceDataInput",
        // "GameResultUpdateInput",
        // "LetsadsSmsMessageStatusUpdateInput",
        // "LogedInUpdateInput",
        // "NoticeUpdateInput",
        // "NoticeUpdateWithoutChatRoomInvitationDataInput",
        // "NotificationTypeUpdateInput",
        // "NotificationTypeUpdateWithoutUsersDataInput",
        // "PositionUpdateWithoutUsersDataInput",
        // "ProjectMemberUpdateWithoutProjectDataInput",
        // "ProjectMemberUpdateWithoutServicesDataInput",
        // "ProjectMemberUpdateWithoutUserDataInput",
        // "ProjectUpdateWithoutChatRoomDataInput",
        // "ProjectUpdateWithoutCustomersDataInput",
        // "ProjectUpdateWithoutMembersDataInput",
        // "ProjectUpdateWithoutPrismaResourcesDataInput",
        // "ProjectUpdateWithoutTasksDataInput",
        // "ProjectUpdateWithoutTeamDataInput",
        // "ResourceTagUpdateInput",
        // "ResourceTagUpdateWithoutCreatedByDataInput",
        // "ResourceTagUpdateWithoutResourceDataInput",
        // "ResourceTagUpdateWithoutTagDataInput",
        // "ResourceUpdateWithoutChildsDataInput",
        // "ResourceUpdateWithoutCommentsDataInput",
        // "ResourceUpdateWithoutCommentTargetDataInput",
        // "ResourceUpdateWithoutImageDataInput",
        // "ResourceUpdateWithoutParentDataInput",
        // "ResourceUpdateWithoutPrismaProjectDataInput",
        // "ResourceUpdateWithoutTagsDataInput",
        // "ResourceUpdateWithoutVotesDataInput",
        // "ServiceCategoryUpdateInput",
        // "ServiceCategoryUpdateWithoutChildsDataInput",
        // "ServiceCategoryUpdateWithoutParentDataInput",
        // "ServiceCategoryUpdateWithoutServicesDataInput",
        // "SmsMessageUpdateInput",
        // "SmsMessageUpdateWithoutStatusDataInput",
        // "TagUpdateInput",
        // "TagUpdateWithoutResourcesDataInput",
        // "TaskMemberUpdateInput",
        // "TaskMemberUpdateWithoutTaskDataInput",
        // "TaskMemberUpdateWithoutUserDataInput",
        // "TaskReactionUpdateWithoutCreatedByDataInput",
        // "TaskUpdateWithoutChatRoomDataInput",
        // "TaskUpdateWithoutChildsDataInput",
        // "TaskUpdateWithoutMembersDataInput",
        // "TaskUpdateWithoutParentDataInput",
        // "TaskUpdateWithoutProjectDataInput",
        // "TaskUpdateWithoutReactionsDataInput",
        // "TaskUpdateWithoutRelatedFromDataInput",
        // "TaskUpdateWithoutRelatedToDataInput",
        // "TaskUpdateWithoutTimersDataInput",
        // "TeamMemberUpdateWithoutTeamDataInput",
        // "TeamMemberUpdateWithoutUserDataInput",
        // "TeamUpdateDataInput",
        // "TeamUpdateWithoutChildsDataInput",
        // "TeamUpdateWithoutMembersDataInput",
        // "TeamUpdateWithoutOrderedProjectsDataInput",
        // "TeamUpdateWithoutParentDataInput",
        // "TeamUpdateWithoutProjectsDataInput",
        // "TimerUpdateWithoutCreatedByDataInput",
        // "TimerUpdateWithoutTaskDataInput",
        // "TourneyPlayerUpdateInput",
        // "TourneyPlayerUpdateWithoutTourneyDataInput",
        // "VoteUpdateInput",
        // "VoteUpdateWithoutResourceDataInput",
        // "VoteUpdateWithoutUserDataInput",
        // "TaskUpdateInput",

        /**
         * Eof prisma-3.14
         */

      ]);

    }
    else {
      console.error(chalk.red(`Schema file ${schemaFile} did not loaded`));
    }


    let apiSchema = super.getApiSchema(types.concat(baseSchema), [
      // "Mutation",
      "User",
      "Resource",

      "UserCreateInput",
      "UserUpdateInput",

      // "ResourceCreateInput",
      // "ResourceUpdateInput",

      // "UserCreateOneWithoutResourcesInput",
      // "NotificationTypeUpdateManyWithoutUsersInput",

      // "UserSubscriptionPayload",
      // "ResourceSubscriptionPayload",


      // // Cooperation
      // "ProjectCreateInput",
      // "ProjectUpdateInput",
      // "TaskSubscriptionPayload",
      // "ProjectMemberCreateManyInput",
      // "TaskCreateManyWithoutProjectInput",
      // "TaskCreateInput",
      // "TaskUpdateInput",
      // "ProjectCreateOneWithoutTasksInput",
      // "TaskCreateOneWithoutChildsInput",
      // "TaskCreateManyWithoutParentInput",
      // "TimerCreateInput",
      // "TimerUpdateInput",
      // "TaskCreateOneWithoutTimersInput",
      // "TaskCreateManyWithoutRelatedFromInput",
      // "TaskCreateManyWithoutRelatedToInput",
      // "TaskCreateOneWithoutMembersInput",
      // "UserCreateOneInput",
      // "UserCreateOneWithoutTasksInput",
      // "TeamCreateOneWithoutChildsInput",
      // "TeamCreateManyWithoutParentInput",
      // "UserCreateOneWithoutTeamsCreatedInput",
      // "TeamMemberCreateManyWithoutTeamInput",
      // "ProjectCreateOneInput",
      // "UserCreateOneWithoutProjectsInput",
      // "ServiceCreateOneInput",
      // "TeamCreateOneWithoutMembersInput",
      // "UserCreateOneWithoutTeamsInput",
      // "ServiceUpdateOneInput",
      // "UserUpdateOneInput",
      // "ProjectUpdateOneInput",
      // "UserUpdateOneWithoutProjectsInput",
      // "TaskUpdateManyWithoutProjectInput",
      // "UserUpdateOneWithoutProjectsCreatedInput",
      // "ProjectMemberUpdateManyInput",
      // "TaskUpdateOneWithoutTimersInput",
      // "UserUpdateOneWithoutTimersInput",
      // "UserUpdateOneWithoutTeamsInput",
      // "TeamUpdateOneWithoutMembersInput",
      // "TeamMemberUpdateManyWithoutTeamInput",
      // "UserUpdateOneWithoutTeamsCreatedInput",
      // "TeamUpdateManyWithoutParentInput",
      // "TeamUpdateOneWithoutChildsInput",
      // "UserUpdateOneWithoutTasksInput",
      // "TaskUpdateOneWithoutMembersInput",
      // "TaskMemberUpdateManyWithoutTaskInput",
      // "ProjectUpdateOneWithoutTasksInput",
      // "TaskMemberUpdateManyWithoutTaskInput",
      // "TaskUpdateOneWithoutChildsInput",
      // "TaskUpdateManyWithoutParentInput",
      // "TaskUpdateManyWithoutRelatedToInput",
      // "TaskUpdateManyWithoutRelatedFromInput",
      // "TimerUpdateManyWithoutTaskInput",
      // "ProjectSubscriptionPayload",
      // "TimerSubscriptionPayload",

      // "EthTransactionCreateInput",
      // "EthTransactionSubscriptionPayload",

    ]);


    let schema = fileLoader(__dirname + '/schema/api/', {
      recursive: true,
    });

    apiSchema = mergeTypes(schema.concat(apiSchema), { all: true });




    /**
     * Фильтруем все резолверы, коих нет в текущем классе
     */
    const resolvers = this.getResolvers();

    const parsed = parse(apiSchema);

    let operations = parsed.definitions.filter(
      n => n.kind === "ObjectTypeDefinition"
        && ["Query", "Mutation", "Subscription"].indexOf(n.name.value) !== -1
      // && !resolvers[n.name.value][]
    );

    operations.map(n => {

      let {
        name: {
          value: operationName,
        },
        fields,
      } = n;

      n.fields = fields.filter(field => {

        return resolvers[operationName][field.name.value] ? true : false;
      });

      return null;
    });

    apiSchema = print(parsed);


    return apiSchema;

  }


  renderApiSchema() {

    let schemaFile = "src/schema/generated/api.graphql";

    let baseSchema = "";

    if (fs.existsSync(schemaFile)) {
      baseSchema = fs.readFileSync(schemaFile, "utf-8");
    }
    // else {
    //   console.log("file not exists");
    // }

    return baseSchema;
  }


  getResolvers() {


    let resolvers = super.getResolvers();



    const {
      Query: {
        letter,
        letters,
        lettersConnection,
        // file,
        files,
        filesConnection,
        logedin,
        logedins,
        logedinsConnection,
        log,
        logs,
        logsConnection,
        import: importNull,
        imports,
        importsConnection,

        resource,
        resources,

        ...Query
      },
      Mutation: {
        createProjectProcessor,
        createTemplateProcessor,
        createCodeChallengeBlockProcessor,
        updateCodeChallengeBlockProcessor,
        createCodeChallengeProcessor,
        updateCodeChallengeProcessor,
        ...Mutation
      },
      User,
      ...other
    } = resolvers;


    let AllowedMutations = {
      ...Mutation,
      createProjectProcessor,
      createTemplateProcessor: async (source, args, ctx, info) => {

        // console.log("createTemplateProcessor args", args);


        /**
         * При создании шаблона, если не был получен проект, создаем его
         */

        const {
          data: {
            component,
            Parent,
          },
        } = args;

        if (component === "Page" && !Parent) {


          const {
            getProjectFromRequest,
            currentUser,
          } = ctx;


          const project = await getProjectFromRequest(ctx);


          // console.log("createTemplateProcessor project", project);
          // console.log("createTemplateProcessor currentUser", currentUser);


          /**
           * Если проекта нет и есть текущий пользователь, создаем новый проект
           */
          if (!project && currentUser) {

            const {
              id: currentUserId,
              username,
            } = currentUser;

            const {
              request: {
                headers,
              },
              db,
            } = ctx;


            // console.log("headers", headers);

            const {
              origin,
            } = headers;

            if (!origin) {
              return this.addError("Can not get request origin");
            }

            const uri = new URI(origin);

            let domain = uri.hostname();
            let subdomain = uri.subdomain();


            if (!domain) {
              return this.addError("Can not get request domain");
            }

            // console.log("subdomain", subdomain, subdomain.split("."));

            /**
             * Если это поддомен, проверяем на совпадение с пользователями
             */

            if (subdomain) {

              const exists = await db.exists.User({
                username_in: subdomain.split("."),
                username_not: username,
              });


              // console.log("subdomain user exists", exists);

              if (exists) {
                return {
                  success: false,
                  message: "Can not create project with url match other user's username",
                  errors: [],
                }
              }

            }

            // return {

            // }


            const projectResponse = await createProjectProcessor(null, {
              data: {
                // domain,
                name: domain,
                url: origin,
                // CreatedBy: {
                //   connect: {
                //     id: currentUserId,
                //   },
                // },
                PrismaUsers: {
                  connect: {
                    id: currentUserId,
                  },
                },
              },
            }, ctx);

            const {
              success,
              data: project,
            } = projectResponse || {};

            // console.log("createTemplateProcessor project 2", project);


            if (!success || !project) {


              // return {
              //   success: false,
              //   message: "Can not create project",
              //   errors: [],
              // }

              return projectResponse;

            }


          }

        }

        // return {
        //   success: false,
        //   message: "Debug",
        //   errors: [],
        // }


        return createTemplateProcessor(source, args, ctx, info);

      },
    };

    // for(var i in AllowedMutations){
    //   AllowedMutations[i] = () => {
    //     throw new Error ("Ведутся технические работы. Ориентировочно закончатся в 10 утра по Москве.");
    //   }
    // }

    // Dev
    // for (var i in AllowedMutations) {

    //   const action = AllowedMutations[i];

    //   AllowedMutations[i] = (a, b, c, d) => {
    //     return new Promise((resolve, reject) => {

    //       setTimeout(async () => {
    //         await action(a,b,c,d)
    //           .then(resolve)
    //           .catch(reject);
    //       }, 2000);

    //     });
    //   }
    // }




    // const {
    //   resource,
    // } = Query

    return {
      ...other,
      Query: {
        ...Query,
        apiSchema: this.renderApiSchema,
        resources,
        resource: async (source, args, ctx, info) => {

          const {
            where,
          } = args;

          let {
            uri,
          } = where || {};

          if (!uri) {
            return resource(source, args, ctx, info);
          }

          /**
           * Если указан ури, но не начинается со слеша, то добавляем слеш
           */
          // if (uri && !uri.startsWith("/")) {
          //   where.uri = `/${uri}`;

          //   Object.assign(args, where);
          // }

          
          const trimmed_uri = '/' + uri.trim().replace(/^\/+|\/+$/g, '');

          const result = await resources(source, {
            ...args,
            where: {
              OR: [
                {
                  uri: trimmed_uri,
                },
                {
                  uri: trimmed_uri + '/',
                },
              ],
            },
          }, ctx, info)

          return result ? result[0] : null;
          // return resource(source, args, ctx, info);
        },
      },
      Mutation: AllowedMutations,
      Log: {
        stack: () => null,
      },
      Letter: {
        id: () => null,
        email: () => null,
        subject: () => null,
        message: () => null,
      },
      User: {
        ...User,
        // EthAccounts: (source, args, ctx) => {

        //   const {
        //     id: userId,
        //     EthAccounts,
        //   } = source;

        //   const {
        //     id: currentUserId,
        //   } = ctx.currentUser || {};

        //   return !currentUserId || currentUserId !== userId ? [] : EthAccounts;
        // },
      },
    };

  }



}


export default CoreModule;