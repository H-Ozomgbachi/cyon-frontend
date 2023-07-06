import requests from "../main/apiConfig";
import { YearProgrammeModel } from "../models/year-programme";

export const YearProgramme = {
  getYearProgrammes: () =>
    requests.get<YearProgrammeModel[]>("/YearProgramme/GetYearProgrammes"),

  addYearProgramme: (payload: FormData) =>
    requests.post("/YearProgramme/AddYearProgramme", payload),

  deleteYearProgramme: (id: string) =>
    requests.del(`/YearProgramme/DeleteYearProgramme/${id}`),
};
