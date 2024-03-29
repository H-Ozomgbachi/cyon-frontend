import { makeAutoObservable, runInAction } from "mobx";
import { SelectOptionModel } from "../../components/shared/models/selectOptionModel";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import {
  ApologyModel,
  ApologySummaryModel,
  AttendanceModel,
  AttendanceRecordDto,
  AttendanceSummaryModel,
  CreateApologyPayload,
  MarkAbsentees,
  TakeAttendance,
} from "../models/attendance";

export class AttendanceStore {
  myAttendance: AttendanceModel[] = [];
  loadingMyAttendance = false;
  myApologies: ApologyModel[] = [];
  loadingMyApologies = false;
  loadingAttendanceTypes = false;
  attendanceTypes: SelectOptionModel[] = [];
  attendanceSummary: AttendanceSummaryModel | null = null;
  apologySummary: ApologySummaryModel | null = null;

  loadingPendingApologies = false;
  pendingApologies: ApologyModel[] = [];

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

  getAttendanceRecord = async (values: AttendanceRecordDto) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.attendance.getAttendanceRecord(values);

      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  takeAttendance = async (values: TakeAttendance) => {
    let flag = false;
    try {
      store.commonStore.setLoading(true);
      await agent.attendance.takeAttendance(values);

      store.commonStore.setAlertText("Attendance recorded");

      flag = true;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      window.scrollTo(0, 0);
    }
    return flag;
  };

  markAbsentees = async (values: MarkAbsentees) => {
    try {
      store.commonStore.setLoading(true);
      const outcome = await agent.attendance.markAbsentees(values);

      store.commonStore.setAlertText(outcome);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      window.scrollTo(0, 0);
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

  getPendingApologies = async () => {
    try {
      this.loadingPendingApologies = true;
      const result = await agent.attendance.getPendingApologies();

      runInAction(() => {
        this.pendingApologies = result;
      });
    } catch (error) {
      throw error;
    } finally {
      this.loadingPendingApologies = false;
    }
  };

  approveApology = async (values: ApologyModel) => {
    try {
      store.commonStore.setLoading(true);
      await agent.attendance.approveApology(values);

      store.commonStore.setAlertText("Apology approved");

      this.getPendingApologies();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  declineApology = async (values: ApologyModel) => {
    try {
      store.commonStore.setModalVisible(false);

      store.commonStore.setLoading(true);
      await agent.attendance.declineApology(values);

      store.commonStore.setAlertText("Apology declined");
      this.getPendingApologies();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  deleteApology = async (id: string) => {
    try {
      await agent.attendance.deleteApology(id);

      store.commonStore.setAlertText("Apology deleted successfully");
      this.getPendingApologies();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setModalVisible(false);
    }
  };

  addApology = async (values: CreateApologyPayload) => {
    try {
      store.commonStore.setModalVisible(false);

      store.commonStore.setLoading(true);
      const result = await agent.attendance.addApology(values);
      store.commonStore.setAlertText(`${result.for} apology sent`);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getAttendanceTypes = async () => {
    try {
      this.loadingAttendanceTypes = true;

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
    } finally {
      this.loadingAttendanceTypes = false;
    }
  };

  getAttendanceSummary = async () => {
    try {
      const result = await agent.attendance.getAttendanceSummary();

      runInAction(() => {
        this.attendanceSummary = result;
      });
    } catch (error) {
      throw error;
    }
  };

  getApologySummary = async () => {
    try {
      const result = await agent.attendance.getApologySummary();

      runInAction(() => {
        this.apologySummary = result;
      });
    } catch (error) {
      throw error;
    }
  };
}
