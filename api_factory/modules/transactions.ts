import { GATEWAY_ENDPOINT } from "../axios.config";

interface VerifyTransactionPayload {
    email: string,
    amount: string,
    subaccount: string
}

export const transactions_api = {
  $_initalize_transactions: (payload: VerifyTransactionPayload) => {
    const url = `/transactions/init`;
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_verify_transactions: (payload: VerifyTransactionPayload) => {
    const url = `/transactions/init`;
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_fetch_banks_list: () => {
    const url = `/transactions/banks`;
    return GATEWAY_ENDPOINT.get(url);
  }
};
