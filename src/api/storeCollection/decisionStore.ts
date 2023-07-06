import { makeAutoObservable } from "mobx";
import { SelectOptionModel } from "../../components/shared/models/selectOptionModel";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import {
  CreateDecision,
  CreateDecisionResponse,
  UpdateDecision,
} from "../models/decision";

export class DecisionStore {
  isDeletingDecision = false;

  constructor() {
    makeAutoObservable(this);
  }

  getDecisions = async () => {
    try {
      store.commonStore.setLoading(true);

      const response = await agent.decision.getDecisions();

      return response;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  addDecision = async (values: CreateDecision) => {
    try {
      await agent.decision.addDecision(values);

      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Decision created successfully");

      this.getDecisions();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };

  updateDecision = async (values: UpdateDecision) => {
    try {
      await agent.decision.updateDecision(values);

      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Decision updated successfully");

      this.getDecisions();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };

  deleteDecision = async (id: string) => {
    try {
      this.isDeletingDecision = true;
      await agent.decision.deleteDecision(id);

      this.isDeletingDecision = false;
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Decision deleted successfully");

      this.getDecisions();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };

  addDecisionResponse = async (values: CreateDecisionResponse) => {
    try {
      await agent.decision.addDecisionResponse(values);

      store.commonStore.setAlertText("Thanks for deciding!");
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };

  getResponseOptions = (values: string[]): SelectOptionModel[] => {
    return values.map((el) => {
      return {
        text: el,
        value: el,
      };
    });
  };
}
