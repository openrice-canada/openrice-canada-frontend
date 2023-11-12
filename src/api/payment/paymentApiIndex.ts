import { AxiosApiClientBuilder } from "../axiosApiIndex";
import { PaymentMethod } from "./paymentMethodType";

const apiClient = new AxiosApiClientBuilder()
  .withResourceName("/payment-method")
  .build();

export const getPaymentMethodList = async (): Promise<PaymentMethod[]> => {
  return apiClient.get("");
};
