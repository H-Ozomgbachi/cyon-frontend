import requests from "../main/apiConfig";
import { YearProgrammeModel } from "../models/year-programme";

export const YearProgramme = {
  getYearProgrammes: () =>
    requests.get<YearProgrammeModel[]>("/YearProgramme/GetYearProgrammes"),
};
