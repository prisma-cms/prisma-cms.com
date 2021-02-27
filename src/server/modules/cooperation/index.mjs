
import CooperationModule from "@prisma-cms/cooperation-module";

import ProjectModule from "./project";
import TimerModule from "./timer";


export default class CooperationModuleCustom extends CooperationModule {

  constructor(props = {}) {

    super(props);

    this.mergeModules([
      ProjectModule,
      TimerModule,
    ]);

  }

  getApiSchema(types = [], excludeTypes = []) {

    let apiSchema = super.getApiSchema(types, excludeTypes);

    apiSchema = this.cleanupApiSchema(apiSchema, [
      "TaskUpdateInput",
      "TaskReactionUpdateInput",
    ]);

    // console.log('apiSchema', apiSchema);

    return apiSchema;
  }

}
