import requests from "../main/apiConfig";
import { OccupationModel, OccupationPayload } from "../models/occupaton";

export const Occupation = {
  getMyOccupation: () =>
    requests.get<OccupationModel>("/Occupations/GetOccupationByUser"),

  addOccupation: (values: OccupationPayload) =>
    requests.post("/Occupations/AddOccupation", values),

  updateOccupation: (values: OccupationPayload) =>
    requests.put("/Occupations/UpdateOccupation", values),
};
