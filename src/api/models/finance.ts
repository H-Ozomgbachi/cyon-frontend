export interface UserFinanceModel {
  id: string;
  description: string;
  dateCollected: string;
  amount: number;
}

export interface CreateUserFinance {
  description: string;
  dateCollected: string;
  amount: number;
  userId: string;
  financeType: string;
}
export interface CreateUserFinanceDues {
  userId: string;
  amountPaid: number;
  duesCostMonthly: number;
}

export interface UserFinanceSummaryModel {
  contribution: number;
  debt: number;
}

export interface OrganizationFinanceModel {
  id?: string;
  financeType: string;
  description: string;
  amount: number;
  date: string;
}

export interface OrganizationBalanceModel {
  balance: number;
}

export interface OrganizationAccountStatementPayload {
  startDate: string;
  endDate: string;
}

export interface OrganizationAccountStatementModel {
  startDate: string;
  endDate: string;
  balanceBroughtForward: number;
  finances: OrganizationFinanceModel[];
  balanceAtHand: number;
}

export interface OrganizationAccountStatementModelResult {
  accountStatement: OrganizationAccountStatementModel;
}
