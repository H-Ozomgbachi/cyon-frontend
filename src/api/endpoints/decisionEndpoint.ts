import requests from "../main/apiConfig";
import {
  CreateDecision,
  CreateDecisionResponse,
  DecisionModel,
  DecisionResponseModel,
  UpdateDecision,
} from "../models/decision";

export const Decision = {
  getDecisions: () => requests.get<DecisionModel[]>("/Decision/GetDecisions"),

  addDecision: (payload: CreateDecision) =>
    requests.post("/Decision/AddDecision", payload),

  updateDecision: (payload: UpdateDecision) =>
    requests.put("/Decision/UpdateDecision", payload),

  deleteDecision: (id: string) =>
    requests.del(`/Decision/DeleteDecision/${id}`),

  getDecisionResponses: (decisionId: string) =>
    requests.get<DecisionResponseModel[]>(
      `/DecisionResponse/GetDecisionResponses/${decisionId}`
    ),

  getMyDecisionResponse: (decisionId: string) =>
    requests.get<DecisionResponseModel>(
      `/DecisionResponse/GetMyDecisionResponse/${decisionId}`
    ),

  addDecisionResponse: (payload: CreateDecisionResponse) =>
    requests.post<DecisionResponseModel>(
      "/DecisionResponse/AddDecisionResponse",
      payload
    ),
};
