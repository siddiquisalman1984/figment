import { Transaction, ActionType } from "../types";

export const filterAndSortTransaction = (
  transactions: Transaction[],
  condition: (transaction: Transaction) => boolean,
  comparator: (current: Transaction, next: Transaction) => number
) => {
  return transactions?.filter(condition).sort(comparator);
};

export const comparator = (current: Transaction, next: Transaction) =>
  new Date(current.time).getTime() - new Date(next.time).getTime();

export const condition = (transaction: Transaction) =>
  transaction.success &&
  transaction.actions.some((action) => action.type === ActionType.Transfer);
