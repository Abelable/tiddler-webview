export interface WithdrawRecord {
  status: number;
  path: number;
  withdrawAmount: number;
  handlingFee: number;
  actualAmount: number;
  createdAt: string;
}

export interface CommissionWithdrawRecord extends WithdrawRecord {
  scene: number;
  taxFee: number;
}

export interface RewardWithdrawRecord extends WithdrawRecord {
  taskId: number;
  taxFee: number;
}
