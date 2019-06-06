// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    CLIENT_ID: "urm8cUtxUrkjdRaYC128zq3xqq8yAfnP",
    CLIENT_DOMAIN: "econn9.auth0.com", // e.g., 'you.auth0.com'
    REDIRECT: "http://localhost:4200/callback",
    LOGOUT_URL: "http://localhost:4200"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
