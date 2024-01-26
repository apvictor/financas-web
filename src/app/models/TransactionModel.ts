export interface TransactionModel {
  id: number;
  name: string;
  value: number;
  accountId: number;
  costCenterId: number;
  transactionType: string;
}
