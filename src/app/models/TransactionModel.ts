export interface TransactionModel {
  id: number;
  name: string;
  value: number;
  accountId: number;
  type: string;
  paid: boolean;
}

export interface FormTransactionModel {
  name: string;
  value: number;
  accountId: number;
  type: string;
  paid: boolean;
}
