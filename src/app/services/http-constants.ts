export class HttpConstants {
  static otp = {
    sendOtp: "/otp/sendOTP/",
    resendOtp: "/otp/resendOTP/",
    login: "/patient/login",
    loginDigiHeals: "/patient/auth/login",
   
  };
  static doctor = {
    getDoctorLandingPageData: "/doctor/getLandingPageDataDoctors/",
    getDoctorLandingPageData_: "/doctor/getDoctorLandingPageData/",

    getDoctorAppointmentsBetween: "/doctor/getDoctorAppointmentsBetween",
    
    getAllDocuments: "/doctor/getAllDocuments/",
    getAllDocument: "/doctor/getAllDocument/",
    uploadDocument: "/doctor/uploadDocument",

  };
  static appointment = {
    
    getPrescriptionById: "/appointment/getPrescriptionById",
    getTodaysAppointment: "/appointment/getTodaysAppt",
    getAllAppointments: "/appointment/allAppointments",
    getFollowAppt: "/appointment/getUpcomingFollowUp",
    getUpcomingAppt: "/appointment/getPatientAppointment",
    getPastAppt: "/appointment/getPastAppt",
    create: "/appointment/create",
    cancelAppointment: "/appointment/cancelAppointment",
    rescheduleAppointment: "/appointment/rescheduleAppointment",
    getSlots:"/appointment/getSlots"
  };
  static patient = {
    updatePateint: "/patient/updatePatientInfo",
    registerPateint: "/patient/createNewPatient/",
    createPatient: "/patient/auth/register/",
    getPatientVitals: "/patient/getVitalsData",
    getLoginDetails: "/patient/getUserDetails",
    getPatientById: "/patient/getPatientById/",
    getLastRecords: "/patient/getLastRecords/",
  };
  static getDashboardData = "/patient/getDashboardData";
  static getAgoraToken = "/otp/getAgoraToken/";
  static digiheals = {
    
    getLatetRx:'/digiheals/getLatestPrescriptionForPatient',
    createScannnedOrder:'/api/v1/prescription/scanedLabOrderFromMachine',
    shareRxToPartner:'/api/v1/prescription/shareDigirecordsPrescriptionToMachine'

  }


}