// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:44340/api',
  messages: {
    serverError: 'System Error',
    saveDone: 'Save Done.',
    generalError: 'General Error'
  },
  auth: {
    clientID: 'nt7F5HZW8nvBon07OlnEXzUcb5lzQhz4',
    domain: 'dev-t8v48210.eu.auth0.com',
    //audience: 'https://localhost:44340/api/search?q=redis',
    redirect: 'http://localhost:44340/',
    audience: 'http://localhost:44340/api',
    scope: 'auth-scope'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
