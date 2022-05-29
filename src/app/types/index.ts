export interface Action {
  readonly data: TransferData | FunctionCallData | AddKeyData;
  readonly type: ActionType;
}

export enum ActionType {
  Transfer = "Transfer",
  FunctionCall = "FunctionCall",
  AddKey = "AddKey",
}

export interface DataType {
  readonly deposit: string;
}

export type TransferData = DataType;
export interface FunctionCallData extends DataType {
  readonly gas: number;
  readonly method_name: string;
}

export enum Permission {
  FullAccess = "FullAccess",
}
export interface AccessKey {
  readonly nonce: number;
  readonly permission: Permission;
}

export interface AddKeyData {
  readonly access_key: AccessKey;
  readonly public_key: string;
}

export interface Transaction {
  readonly id: number;
  readonly created_at: string;
  readonly updated_at: string;
  readonly time: string;
  readonly height: number;
  readonly hash: string;
  readonly block_hash: string;
  readonly sender: string;
  readonly receiver: string;
  readonly gas_burnt: string;
  readonly actions: Action[];
  readonly actions_count: number;
  readonly success: boolean;
}

export enum TransactionType {
  Near = "near",
}

export const TransactionTypeImage = new Map<TransactionType, string>([
  [
    TransactionType.Near,
    "https://coinyuppie.com/wp-content/uploads/2021/09/4954839_image3.jpg",
  ],
]);
