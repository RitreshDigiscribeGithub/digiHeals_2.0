import { environment } from "@env/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DgPaymentServiceService {
  constructor(private http: HttpClient) {}

  get WindowRef() {
    return window;
  }

  
  getUpcomingAppt(postData) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/checkUpcomingAppointment",
      postData
    );
  }


  createOrder(paymentOrderDetails) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/createPaymentOrder",
      paymentOrderDetails
    );
  }

  

  capturePayment(paymentDetails) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/capturePayment",
      paymentDetails
    );
  }

  fetchPaymentDetailsById(paymentDetails) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/fetchPaymentById",
      paymentDetails
    );
  }

  verifyPayment(verifyDetails) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/verifyPayment",
      verifyDetails
    );
  }

  getUpdateAmountFromServer(billingData) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/calulateBilling",
      billingData
    );
  }
  getDoctorData(username) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/testAPi",
      username
    );
  }

  sendMsgInfo(data) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/sendReminder",
      data
    );
  }

  createRefundRequest(paymentDetails) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/createRefund",
      paymentDetails
    );
  }

  sendPaymentMsg(paymentDetails) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/sendPaymentReminder",
      paymentDetails
    );
  }

  getRefundAmount(paymentDetails) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/getRefundAmount",
      paymentDetails
    );
  }

  createDocument(document) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/appointment",
      document
    );
  }

  
  createDocumentPatient(document) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/creteNewPatient",
      document
    );
  }


  createLogDocument(document) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/createLearing",
      document
    );
  }


  uploadFile(document) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/uploadS3Pre",
      document
    );
  }

  createPrescription(document) {
    return this.http.post(
     "https://api.digiscribe.in:3002/api/v1/createPrescription",
      document
    );
  }

  updateDoctorId(document) {
    return this.http.post(
      environment.paymentgateway.baseEndPointv1 + "/updatePatientInfo",
      document
    );
  }

  getpatient(document) {
    return this.http.post(
      environment.paymentgateway.baseEndPoint + "/getPatient",
      document
    );
  }
  
}
