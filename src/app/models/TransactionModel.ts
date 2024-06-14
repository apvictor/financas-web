export interface TransactionModel {
  id: number;
  name: string;
  value: number;
  accountId: number;
  type: string;
}

export interface FormTransactionModel {
  name: string;
  value: number;
  accountId: number;
  type: string;
}
