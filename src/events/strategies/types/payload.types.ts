export type ProducePayload =
  | {
      type: 'Merchant-Validate';
      payload: {
        serviceID: string;
      };
    }
  | {
      type: 'Process-Payment';
      payload: {
        mobileNumber: number;
      };
    };
