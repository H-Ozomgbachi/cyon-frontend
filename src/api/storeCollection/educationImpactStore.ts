import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
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

export class EducationImpactStore {
  activeCampaign: CampaignModel | null = null;
  allCampaigns: CampaignModel[] = [];
  currentCampaign: CampaignModel | null = null;
  campaignStatistics: CampaignStatisticsModel | null = null;

  jambApplications: JambApplicantModel[] = [];
  currentJambApplication: JambApplicantModel | null = null;

  tertiaryApplications: TertiaryApplicantModel[] = [];
  currentTertiaryApplication: TertiaryApplicantModel | null = null;
  topTertiaryApplicants: TertiaryApplicantModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Public Campaign Methods
  getActiveCampaign = async () => {
    try {
      const result = await agent.educationImpact.getActiveCampaign();
      runInAction(() => {
        this.activeCampaign = result;
      });
      return result;
    } catch (error) {
      console.error("No active campaign available:", error);
      runInAction(() => {
        this.activeCampaign = null;
      });
      return null;
    }
  };

  // Helper method to get active campaigns (fallback if backend doesn't return active)
  getActiveCampaigns = async () => {
    try {
      const allCampaigns = await agent.educationImpact.getAllCampaigns(0, 50);
      const activeCampaigns = allCampaigns.filter(
        (campaign) => campaign.isActive && campaign.isOpen
      );
      return activeCampaigns;
    } catch (error) {
      console.error("Failed to get active campaigns:", error);
      throw error;
    }
  };

  getAllCampaigns = async (skip: number = 0, limit: number = 10) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.educationImpact.getAllCampaigns(skip, limit);
      runInAction(() => {
        this.allCampaigns = result;
      });
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getCampaignById = async (campaignId: string) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.educationImpact.getCampaignById(campaignId);
      runInAction(() => {
        this.currentCampaign = result;
      });
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Public Application Methods
  submitJambApplication = async (values: CreateJambApplicationDto) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.educationImpact.submitJambApplication(values);
      store.commonStore.setAlertText(
        "Your application has been submitted successfully! We will review it and get back to you."
      );
      // Clear draft from localStorage
      localStorage.removeItem("jambApplicationDraft");
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  submitTertiaryApplication = async (
    values: CreateTertiaryApplicationDto
  ) => {
    try {
      store.commonStore.setLoading(true);
      const result =
        await agent.educationImpact.submitTertiaryApplication(values);
      store.commonStore.setAlertText(
        "Your application has been submitted successfully! We will review it and get back to you."
      );
      // Clear draft from localStorage
      localStorage.removeItem("tertiaryApplicationDraft");
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Admin Campaign Management
  createCampaign = async (values: CreateCampaignDto) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.educationImpact.createCampaign(values);
      store.commonStore.setAlertText("Campaign created successfully");
      this.getAllCampaigns();
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  updateCampaign = async (values: UpdateCampaignDto) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.educationImpact.updateCampaign(values);
      store.commonStore.setAlertText("Campaign updated successfully");
      this.getAllCampaigns();
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  deleteCampaign = async (campaignId: string) => {
    try {
      store.commonStore.setLoading(true);
      await agent.educationImpact.deleteCampaign(campaignId);
      store.commonStore.setAlertText("Campaign deleted successfully");
      this.getAllCampaigns();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  openCampaign = async (campaignId: string) => {
    try {
      store.commonStore.setLoading(true);
      await agent.educationImpact.openCampaign(campaignId);
      store.commonStore.setAlertText("Campaign opened successfully");
      this.getAllCampaigns();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  closeCampaign = async (campaignId: string) => {
    try {
      store.commonStore.setLoading(true);
      await agent.educationImpact.closeCampaign(campaignId);
      store.commonStore.setAlertText("Campaign closed successfully");
      this.getAllCampaigns();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getCampaignStatistics = async (campaignId: string) => {
    try {
      store.commonStore.setLoading(true);
      const result =
        await agent.educationImpact.getCampaignStatistics(campaignId);
      runInAction(() => {
        this.campaignStatistics = result;
      });
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Admin JAMB Applications
  getAllJambApplications = async (skip: number = 0, limit: number = 20) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.educationImpact.getAllJambApplications(
        skip,
        limit
      );
      runInAction(() => {
        this.jambApplications = result;
      });
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getJambApplicationsByCampaign = async (
    campaignId: string,
    skip: number = 0,
    limit: number = 20
  ) => {
    try {
      store.commonStore.setLoading(true);
      const result =
        await agent.educationImpact.getJambApplicationsByCampaign(
          campaignId,
          skip,
          limit
        );
      runInAction(() => {
        this.jambApplications = result;
      });
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getJambApplicationById = async (applicationId: string) => {
    try {
      store.commonStore.setLoading(true);
      const result =
        await agent.educationImpact.getJambApplicationById(applicationId);
      runInAction(() => {
        this.currentJambApplication = result;
      });
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  reviewJambApplication = async (values: ReviewApplicationDto) => {
    try {
      store.commonStore.setLoading(true);
      await agent.educationImpact.reviewJambApplication(values);
      store.commonStore.setAlertText("Application reviewed successfully");
      // Refresh the application
      if (this.currentJambApplication) {
        this.getJambApplicationById(this.currentJambApplication.id);
      }
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Admin Tertiary Applications
  getAllTertiaryApplications = async (
    skip: number = 0,
    limit: number = 20
  ) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.educationImpact.getAllTertiaryApplications(
        skip,
        limit
      );
      runInAction(() => {
        this.tertiaryApplications = result;
      });
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getTertiaryApplicationsByCampaign = async (
    campaignId: string,
    skip: number = 0,
    limit: number = 20
  ) => {
    try {
      store.commonStore.setLoading(true);
      const result =
        await agent.educationImpact.getTertiaryApplicationsByCampaign(
          campaignId,
          skip,
          limit
        );
      runInAction(() => {
        this.tertiaryApplications = result;
      });
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getTertiaryApplicationById = async (applicationId: string) => {
    try {
      store.commonStore.setLoading(true);
      const result =
        await agent.educationImpact.getTertiaryApplicationById(applicationId);
      runInAction(() => {
        this.currentTertiaryApplication = result;
      });
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getTopTertiaryApplicants = async (campaignId: string, count: number = 3) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.educationImpact.getTopTertiaryApplicants(
        campaignId,
        count
      );
      runInAction(() => {
        this.topTertiaryApplicants = result;
      });
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  reviewTertiaryApplication = async (values: ReviewApplicationDto) => {
    try {
      store.commonStore.setLoading(true);
      await agent.educationImpact.reviewTertiaryApplication(values);
      store.commonStore.setAlertText("Application reviewed successfully");
      // Refresh the application
      if (this.currentTertiaryApplication) {
        this.getTertiaryApplicationById(this.currentTertiaryApplication.id);
      }
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // File Upload
  uploadDocument = async (file: File) => {
    try {
      const result = await agent.educationImpact.uploadDocument(file);
      return result.url;
    } catch (error) {
      store.commonStore.setAlertText("Failed to upload document", true);
      throw error;
    }
  };

  // Reset store
  reset = () => {
    this.activeCampaign = null;
    this.allCampaigns = [];
    this.currentCampaign = null;
    this.campaignStatistics = null;
    this.jambApplications = [];
    this.currentJambApplication = null;
    this.tertiaryApplications = [];
    this.currentTertiaryApplication = null;
    this.topTertiaryApplicants = [];
  };
}
