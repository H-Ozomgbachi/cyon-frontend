export interface UserFinanceModel {
  id: string;
  description: string;
  dateCollected: string;
  amount: number;
}

export interface OrganizationFinanceModel {
  id: string;
  financeType: string;
  description: string;
  amount: number;
  date: string;
}

export interface OrganizationBalanceModel {
  balance: number;
}
