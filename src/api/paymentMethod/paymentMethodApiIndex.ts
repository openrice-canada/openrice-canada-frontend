import { AxiosApiClientBuilder } from "../axiosIndex";
import { PaymentMethod } from "./paymentMethodType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/payment-method")
  .build();

export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  return apiClient.get("");
};
