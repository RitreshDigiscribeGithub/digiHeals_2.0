
export class Payment {
    amount: Number;
    amount_refunded: Number
    appointmentAmountType:string;
    appointmentBaseAmount: Number;
    appointmentCaptureAmount: Number;
    appointmentCreateDate: Number;
    appointmentId:string;
    appointmentTime: Number;
    bank:string;
    captured: boolean;
    card_id:string;
    channels:string[];
    contact:string;
    created_at:Number;
    fee:Number;
  currency:string;
  description:string;
  doc_id:string;
  doctorId:string;
  email:string;
  errorMsg:string;
  error_code:any;
  error_description:string;
  isOnline?:boolean;
  isPaymentFetch:boolean;
  isPaymentVerify:boolean;
  method:string;
  order_id:string;
  patientId:string;
  payment_id:string;
  razorpay_order_id:string;
  razorpay_payment_id:string;
  razorpay_signature:string;
  receipt:string;
  refund_id:string;
  refund_status:string;
  status:string;
  subType:string;
  tax:Number;
  type:string;
  verifyFailedReason:string;
  vpa:string;
  wallet:string;
  public static default = (): Payment => {
    return {
        amount: 0,
        amount_refunded: 0,
        appointmentAmountType: "",
        appointmentBaseAmount: 0,
        appointmentCaptureAmount: 0,
        appointmentCreateDate: 0,
        appointmentId: "",
        appointmentTime: 0,
        bank: "",
        captured: false,
        card_id: "",
        channels: [],
        contact: "",
        created_at: 0,
        currency: "INR",
        description: "Appointment Charge",
        doc_id:"",
        doctorId: "",
        email: "",
        errorMsg: "",
        error_code: "",
        error_description: "",
        fee: 0,
        isOnline: true,
        isPaymentFetch: false,
        isPaymentVerify: false,
        method: "",
        order_id: "",
        patientId: "",
        payment_id: "",
        razorpay_order_id: "",
        razorpay_payment_id: "",
        razorpay_signature: "",
        receipt: "",
        refund_id: "",
        refund_status: "",
        status: "",
        subType: "",
        tax: 0,
        type: "payment",
        verifyFailedReason: "",
        vpa:"",
        wallet:"" 
    };
  };
}
