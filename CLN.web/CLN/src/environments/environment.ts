// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'https://prucompraspublicasback.ivolucion.com',/*pruebas*/
  //apiUrl: 'https://localhost:44387',
  apiUrl: 'https://preprocompraspublicasback.ivolucion.com', /*pre-Production*/
  //apiUrl: 'https://compraspublicas.compralonuestro.co/services', /*Production*/
  // apiUrl: 'https://clnpruebasback.ivolucion.com', /*pre-Production*/
  tempEscuela: 311
  //tempEscuela: 49 /*pre-Production*/
  //tempEscuela:41
  , path_micrositios: 'C:/inetpub/prucompraspublicas' //esto no es necesario
  //,path_micrositios: 'C:/inetpub/wwwcompraspublicasfront' /*pre-Production*/
  //,path_micrositios: 'C:/inetpub/wwwcompraspublicasfront' /*Production*/
  , timeout: 15
  , isPlansAcquisition: false
  , casUrl: "https://qat02-auth.connectamericas.com/ca-cas/login?service="
  // , casUrl: "https://prd-auth.connectamericas.com/ca-cas/login?service="
  , isServicios: true
  , API_KEY: '1537FA0809AC311823C44D42B8F762ED632DC82D'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
