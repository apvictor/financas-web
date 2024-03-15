export interface CardModel {
  id: number;
  name: string;
  limit: number;
  dueDate: string;
  value: number;
}

export interface FormCardModel {
  name: string;
  limit: number;
  dueDate: Date;
}
