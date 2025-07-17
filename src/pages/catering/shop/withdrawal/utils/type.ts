export interface WithdrawRecord {
  status: number;
  path: number;
  withdrawAmount: number;
  handlingFee: number;
  taxFee: number;
  actualAmount: number;
  createdAt: string;
}
