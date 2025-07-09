export interface Deposit {
  balance: number;
  dueAmount: number;
}

export interface DepositLog {
  id: number;
  changeType: number;
  referenceId: string;
  changeAmount: number;
  createdAt: string;
}
