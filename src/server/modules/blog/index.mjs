// import PrismaModule from "@prisma-cms/prisma-module";

import ResourceModule from // UserPayload,
'@prisma-cms/resource-module'

import MergeSchema from 'merge-graphql-schemas'

import path from 'path'

const moduleURL = new URL(import.meta.url)

const __dirname = path.dirname(moduleURL.pathname)

const { fileLoader, mergeTypes } = MergeSchema

// export class ModxclubBlogProcessor extends UserPayload{

// }

class ModxclubBlogModule extends ResourceModule {
  // constructor() {

  //   super();

  //   this.mergeModules([
  //     SocialModule,
  //   ]);

  // }

  getSchema() {
    return
  }

  getApiSchema(types = []) {
    return
  }

  getResolvers() {
    // let resolvers = super.getResolvers();

    // const {
    //   Mutation: {
    //     signup,
    //     ...Mutation
    //   },
    //   ...other
    // } = resolvers;

    // return {
    //   Mutation: {
    //     ...Mutation,
    //     signup: (source, args, ctx, info) => {

    //       return new ModxclubBlogProcessor(ctx).signup(source, args, ctx, info);
    //     },
    //   },
    //   ...other,
    // };

    return {}
  }
}

export default ModxclubBlogModule
