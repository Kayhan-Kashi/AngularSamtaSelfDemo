// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl:'http://bs.ba24.ir/samtaapi',
  apiUrl: 'https://bs.ba24.ir/SamtaLoanInteranetAPI',
  ssoUrl: 'https://bs.ba24.ir/UserManagement_Test_V4/login',
  subAppUrl: '/SamtaLoanInteranet',
  currentUser: 'currentUser_SamtaLoanInteranet',
  userFullName: 'userFullName_SamtaLoanInteranet',
  userBranch: 'userBranch_SamtaLoanInteranet',
  userRoles: 'userRoles_SamtaLoanInteranet',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
