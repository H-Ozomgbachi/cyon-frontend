import { createContext, useContext } from "react";
import { AuthenticationStore } from "../storeCollection/authenticationStore";
import { CommonStore } from "../storeCollection/commonStore";
import { AnnouncementStore } from "../storeCollection/announcementStore";
import { YearProgrammeStore } from "../storeCollection/yearprogrammeStore";
import { FinanceStore } from "../storeCollection/financeStore";
import { AttendanceStore } from "../storeCollection/attendanceStore";
import { MeetingStore } from "../storeCollection/meetingStore";
import { OccupationStore } from "../storeCollection/occupationStore";
import { DepartmentStore } from "../storeCollection/departmentStore";
import { UpcomingEventStore } from "../storeCollection/upcomingEventStore";
import { AccountManagementStore } from "../storeCollection/accountManagementStore";
import { DecisionStore } from "../storeCollection/decisionStore";
import { NotificationsStore } from "../storeCollection/notificationsStore";

interface Store {
  commonStore: CommonStore;
  authenticationStore: AuthenticationStore;
  announcementStore: AnnouncementStore;
  yearProgrammeStore: YearProgrammeStore;
  financeStore: FinanceStore;
  attendanceStore: AttendanceStore;
  meetingStore: MeetingStore;
  occupationStore: OccupationStore;
  departmentStore: DepartmentStore;
  upcomingEventStore: UpcomingEventStore;
  accountManagementStore: AccountManagementStore;
  decisionStore: DecisionStore;
  notificationsStore: NotificationsStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  authenticationStore: new AuthenticationStore(),
  announcementStore: new AnnouncementStore(),
  yearProgrammeStore: new YearProgrammeStore(),
  financeStore: new FinanceStore(),
  attendanceStore: new AttendanceStore(),
  meetingStore: new MeetingStore(),
  occupationStore: new OccupationStore(),
  departmentStore: new DepartmentStore(),
  upcomingEventStore: new UpcomingEventStore(),
  accountManagementStore: new AccountManagementStore(),
  decisionStore: new DecisionStore(),
  notificationsStore: new NotificationsStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
