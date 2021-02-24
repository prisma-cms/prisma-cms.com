

import chalk from "chalk";

import ProjectModule, {
  ProjectProcessor,
} from "@prisma-cms/cooperation-module/src/modules/project";


import {
  ResourceProcessor,
} from "@prisma-cms/resource-module";


export class ModxclubProjectProcessor extends ProjectProcessor {


  // async create(method, args, info) {

  //   const {
  //     ctx,
  //   } = this;

  //   let {
  //     data: {
  //       name,
  //       ...data
  //     },
  //   } = args;

  //   name = name && name.trim() || "";


  //   const resourceProcessor = new ResourceProcessor(ctx);

  //   let resourceUriData = await resourceProcessor.prepareUri({
  //     data: {
  //       type: "Project",
  //       name,
  //       uri: `/projects/${name}`,
  //     },
  //   });




  //   const Resource = {
  //     create: {
  //       ...resourceUriData,
  //       name,
  //       ...this.getCreatedBy(),
  //     },
  //   }


  //   Object.assign(data, {
  //     name,
  //     Resource,
  //     resourceData: Resource.create,
  //   });




  //   Object.assign(args, {
  //     data,
  //   });


  //   return super.create(method, args, info);
  // }


  // async update(method, args, info) {

  //   const {
  //     ctx,
  //   } = this;

  //   let {
  //     data: {
  //       name,
  //       ...data
  //     },
  //   } = args;


  //   let Resource = {
  //     update: {
  //     },
  //   };

  //   let resourceData = Resource.update;

  //   if (name !== undefined) {

  //     name = name && name.trim() || "";

  //     if (!name) {
  //       name = undefined;
  //     }
  //     else {
  //       Object.assign(resourceData, {
  //         name,
  //       });
  //     }

  //   }




  //   Object.assign(data, {
  //     name,
  //     Resource,
  //     resourceData,
  //   });


  //   Object.assign(args, {
  //     data,
  //   });


  //   return super.update(method, args, info);
  // }


  async mutate(method, args, info) {



    const {
      db,
    } = this.ctx;

    let {
      data: {
        url,
        image,
        resourceData,
        ...data
      },
    } = args;


    if (url) {

      url = url.trim();

      if (!url.match(/^http.*\:\/\//)) {
        url = `http://${url}`;
      }

    }


    /**
     * Обновляем картинку
     */
    if (image) {

      let files = await db.query.files({
        where: {
          path: image,
        },
        first: 1,
      });

      const file = files && files[0] || null;

      if (!file) {
        return this.addError("Не был получен файл");
      }
      else {

        const {
          id: fileId,
        } = file;

        Object.assign(resourceData, {
          Image: {
            connect: {
              id: fileId,
            },
          },
        });

      }

    }


    Object.assign(data, {
      url,
    });


    args.data = data;

    return super.mutate(method, args);
  }

}



class ModxclubProjectModule extends ProjectModule {

  getProcessorClass() {
    return ModxclubProjectProcessor;
  }

}


export default ModxclubProjectModule;