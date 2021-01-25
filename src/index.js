

import React from 'react';
import ReactDOM from 'react-dom';

import PrismaCms, { loader } from "@prisma-cms/front";

import * as serviceWorker from './serviceWorker';

import App, {
  // queryFragments,
} from "./App";

import {
  UserNoNestingFragment,
  TimerNoNestingFragment,
  ProjectTaskNoNestingFragment,
  TaskNoNestingFragment,
  ProjectNoNestingFragment,
} from "./schema/generated/api.fragments";

const node = document.getElementById('root');

if (node) {

  loader({})
    .then(() => {

      ReactDOM.render(<PrismaCms
        App={App}
        apolloOptions={{
          apiQuery: `{
            user:me{
              ...UserNoNesting
              EthAccounts {
                id
                address
                balance(convert:ether)
              }
              Timers (
                first: 1
                where:{
                  stopedAt: null
                }
              ){
                ...TimerNoNesting
                Task{
                  ...TaskNoNesting
                  TaskProjects{
                    ...ProjectTaskNoNesting
                    Project{
                      ...ProjectNoNesting
                    }
                  }
                }
              }
            } 
          }
          ${UserNoNestingFragment}
          ${TimerNoNestingFragment}
          ${ProjectTaskNoNestingFragment}
          ${TaskNoNestingFragment}
          ${ProjectNoNestingFragment}
          `,
        }}
      />, node);

      // If you want your app to work offline and load faster, you can change
      // unregister() to register() below. Note this comes with some pitfalls.
      // Learn more about service workers: https://bit.ly/CRA-PWA
      serviceWorker.unregister();

    })

}

