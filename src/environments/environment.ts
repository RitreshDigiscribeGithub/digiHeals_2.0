// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   //apiEndpoint: "http://localhost:3000",
   apiEndpoint: "https://doctor.digiscribe.in",
   apiEndpointPartner: "https://partner.digiscribe.in",
   paymentgateway: {
      baseEndPoint: "https://api.digiscribe.in:3002/api/v2",
      baseEndPointv1: "https://api.digiscribe.in:3002/api/v1",
    // baseEndPoint: "http://localhost:3001/api/v2",
     //baseEndPointv1: "http://localhost:3001/api/v1",
 
   },
   // rozarPay: {
   //   key_id: "rzp_test_pUKWlTkrpJQsqT",
   //   key_secret: "ayBwSECUZlFPcrdZtnjfmVLD",
 
   // },
   rozarPay: {
     key_id: "rzp_live_GFYQtd70Qg08fW",
     key_secret: "0bgm6fcMbrLgP68Uylez2HPm",
 
   },
 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
