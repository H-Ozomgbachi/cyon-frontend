import requests from "../main/apiConfig";
import {
  FoundTreasureDto,
  TreasureResultModel,
  YearProgrammeModel,
} from "../models/year-programme";

export const YearProgramme = {
  getYearProgrammes: () =>
    requests.get<YearProgrammeModel[]>("/YearProgramme/GetYearProgrammes"),

  addYearProgramme: (payload: FormData) =>
    requests.post("/YearProgramme/AddYearProgramme", payload),

  deleteYearProgramme: (id: string) =>
    requests.del(`/YearProgramme/DeleteYearProgramme/${id}`),

  //Remove Later
  postTreasureHuntResult: (values: FoundTreasureDto) =>
    requests.post("/Games/PostTreasureHuntResult", values),

  getTreasureHuntResult: () =>
    requests.get<TreasureResultModel[]>("/Games/GetTreasureHuntResults"),
};
