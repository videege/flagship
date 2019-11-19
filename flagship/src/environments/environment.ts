// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAmVMMhoPnGOs-LLCCUozwQt3onJ-ltCdY",
    authDomain: "flagship-armada-development.firebaseapp.com",
    databaseURL: "https://flagship-armada-development.firebaseio.com",
    projectId: "flagship-armada-development",
    storageBucket: "",
    messagingSenderId: "243520392824",
    appId: "1:243520392824:web:648ab41c9e615fdb01e78d"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
