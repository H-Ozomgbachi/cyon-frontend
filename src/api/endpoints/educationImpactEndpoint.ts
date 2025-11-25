import requests from "../main/apiConfig";
import {
  CampaignModel,
  CampaignStatisticsModel,
  CreateCampaignDto,
  UpdateCampaignDto,
  CreateJambApplicationDto,
  JambApplicantModel,
  CreateTertiaryApplicationDto,
  TertiaryApplicantModel,
  ReviewApplicationDto,
} from "../models/educationImpact";

export const EducationImpact = {
  // Public Campaign APIs
  getActiveCampaign: () =>
    requests.get<CampaignModel>("/education-impact/campaigns/active"),

  getAllCampaigns: (skip: number = 0, limit: number = 10) =>
    requests.get<CampaignModel[]>(
      `/education-impact/campaigns?skip=${skip}&limit=${limit}`
    ),

  getCampaignById: (campaignId: string) =>
    requests.get<CampaignModel>(`/education-impact/campaigns/${campaignId}`),

  // Public Application APIs
  submitJambApplication: (payload: CreateJambApplicationDto) =>
    requests.post<JambApplicantModel>(
      "/education-impact/applications/jamb",
      payload
    ),

  submitTertiaryApplication: (payload: CreateTertiaryApplicationDto) =>
    requests.post<TertiaryApplicantModel>(
      "/education-impact/applications/tertiary",
      payload
    ),

  // Admin Campaign Management
  createCampaign: (payload: CreateCampaignDto) =>
    requests.post<CampaignModel>("/education-impact/campaigns", payload),

  updateCampaign: (payload: UpdateCampaignDto) =>
    requests.put<CampaignModel>("/education-impact/campaigns", payload),

  deleteCampaign: (campaignId: string) =>
    requests.del<boolean>(`/education-impact/campaigns/${campaignId}`),

  openCampaign: (campaignId: string) =>
    requests.post<boolean>(`/education-impact/campaigns/${campaignId}/open`),

  closeCampaign: (campaignId: string) =>
    requests.post<boolean>(`/education-impact/campaigns/${campaignId}/close`),

  getCampaignStatistics: (campaignId: string) =>
    requests.get<CampaignStatisticsModel>(
      `/education-impact/campaigns/${campaignId}/statistics`
    ),

  // Admin JAMB Applications
  getAllJambApplications: (skip: number = 0, limit: number = 20) =>
    requests.get<JambApplicantModel[]>(
      `/education-impact/applications/jamb?skip=${skip}&limit=${limit}`
    ),

  getJambApplicationsByCampaign: (
    campaignId: string,
    skip: number = 0,
    limit: number = 20
  ) =>
    requests.get<JambApplicantModel[]>(
      `/education-impact/campaigns/${campaignId}/applications/jamb?skip=${skip}&limit=${limit}`
    ),

  getJambApplicationById: (applicationId: string) =>
    requests.get<JambApplicantModel>(
      `/education-impact/applications/jamb/${applicationId}`
    ),

  reviewJambApplication: (payload: ReviewApplicationDto) =>
    requests.post<boolean>(
      "/education-impact/applications/jamb/review",
      payload
    ),

  // Admin Tertiary Applications
  getAllTertiaryApplications: (skip: number = 0, limit: number = 20) =>
    requests.get<TertiaryApplicantModel[]>(
      `/education-impact/applications/tertiary?skip=${skip}&limit=${limit}`
    ),

  getTertiaryApplicationsByCampaign: (
    campaignId: string,
    skip: number = 0,
    limit: number = 20
  ) =>
    requests.get<TertiaryApplicantModel[]>(
      `/education-impact/campaigns/${campaignId}/applications/tertiary?skip=${skip}&limit=${limit}`
    ),

  getTertiaryApplicationById: (applicationId: string) =>
    requests.get<TertiaryApplicantModel>(
      `/education-impact/applications/tertiary/${applicationId}`
    ),

  getTopTertiaryApplicants: (campaignId: string, count: number = 3) =>
    requests.get<TertiaryApplicantModel[]>(
      `/education-impact/campaigns/${campaignId}/applications/tertiary/top?count=${count}`
    ),

  reviewTertiaryApplication: (payload: ReviewApplicationDto) =>
    requests.post<boolean>(
      "/education-impact/applications/tertiary/review",
      payload
    ),

  // File Upload
  uploadDocument: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return requests.post<{ url: string }>("/education-impact/upload", formData);
  },
};
