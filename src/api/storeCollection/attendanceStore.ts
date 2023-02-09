import { makeAutoObservable, runInAction } from "mobx";
import { SelectOptionModel } from "../../components/shared/models/selectOptionModel";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import {
  ApologyModel,
  AttendanceModel,
  CreateApologyPayload,
} from "../models/attendance";

export class AttendanceStore {
  myAttendance: AttendanceModel[] = [];
  loadingMyAttendance = false;
  myApologies: ApologyModel[] = [];
  loadingMyApologies = false;
  attendanceTypes: SelectOptionModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getMyAttendance = async () => {
    try {
      this.loadingMyAttendance = true;
      const result = await agent.attendance.getMyAttendanceRecord();

      runInAction(() => {
        this.myAttendance = result;
      });
    } catch (error) {
      throw error;
    } finally {
      this.loadingMyAttendance = false;
    }
  };

  getMyApologies = async () => {
    try {
      this.loadingMyApologies = true;
      const result = await agent.attendance.getMyApologyRecord();

      runInAction(() => {
        this.myApologies = result;
      });
    } catch (error) {
      throw error;
    } finally {
      this.loadingMyApologies = false;
    }
  };

  addApology = async (values: CreateApologyPayload) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.attendance.addApology(values);
      store.commonStore.setAlertText(`${result.for} apology sent`);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(false);
    }
  };

  getAttendanceTypes = async () => {
    try {
      const result = await agent.attendance.getAttendanceTypes();

      runInAction(() => {
        this.attendanceTypes = result.map((el) => {
          return {
            text: el.name,
            value: el.id,
          };
        });
      });
    } catch (error) {
      throw error;
    }
  };
}
