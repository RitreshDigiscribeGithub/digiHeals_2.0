export class billingAmount {
    billingAmount: number;
    billingName: string;
    isValid?: boolean;
    receivableAmount: number; 
    public static default = (): billingAmount => {
      return {
      billingAmount:0,
      billingName:"",
      receivableAmount:0
    };
  };
  }