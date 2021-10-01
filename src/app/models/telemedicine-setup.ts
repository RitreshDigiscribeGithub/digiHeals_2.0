export interface TelemedicineSetup {
  billingDetails: BillingDetail[];
  channels: string[];
  docId: string;
  doctorId: string;
  followupDuration: string;
  followupDurationType: string;
  followupDurationWaiver: boolean;
  paymentDetails: PaymentDetails;
  type: string;
  welcomeMessage: string;
  //   $loki?: number;
  doc_id?: string;
  isOnline?: boolean;
  timestamp?: number;
}

interface PaymentDetails {
  accountName: string;
  accountNumber: string;
  accountType: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
  panCard: string;
  settlements: string;
  upiLink?: string;
}

interface BillingDetail {
  billingAmount: number;
  billingName: string;
  receivableAmount: number;
}
