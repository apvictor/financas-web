export interface TransactionModel {
  id: number;
  name: string;
  value: number;
  accountId: number;
  cardId: number | null;
  costCenterId: number;
  transactionType: string;
}


export interface FormTransactionModel {
  name: string;
  value: number;
  cardId: number;
  accountId: number;
  costCenterId: number;
  transactionType: string;
}
