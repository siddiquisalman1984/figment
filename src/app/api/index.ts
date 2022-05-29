import { Transaction, TransactionType } from "../types";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { DEFAULT_AXIOS_CONFIG } from "../constants";

export const PATHS = Object.freeze({
  TRANSACTION_DATA: (transactionType: TransactionType) =>
    `/${transactionType}/transactions`,
});

const BASE_URL = "http://figment-mock-data.figment.network";

const CONFIG: AxiosRequestConfig = {
  ...DEFAULT_AXIOS_CONFIG,
  baseURL: BASE_URL,
};

export const getTransactions = (
  transactionType: TransactionType
): Promise<AxiosResponse<Transaction[]>> => {
  const params = new URLSearchParams([
    ["api_key", import.meta.env.VITE_APP_TRANSATION_API_KEY],
  ]);
  return axios.get<Transaction[]>(PATHS.TRANSACTION_DATA(transactionType), {
    ...CONFIG,
    params,
  });
};
