export interface DecisionModel {
  id: string;
  question: string;
  options: string;
  result: string;
  isClosed: boolean;
  isActive: boolean;
  dateAdded: string;
}

export interface CreateDecision {
  question: string;
  options: string[];
}

export interface UpdateDecision {
  id: string;
  question: string;
  options: string;
  isClosed: boolean;
  isActive: boolean;
}

export interface CreateDecisionResponse {
  response: string;
  decisionId: string;
}

export interface DecisionResponseModel {
  id: string;
  dateAdded: string;
  createdBy: string;
  response: string;
  decisionId: string;
}
