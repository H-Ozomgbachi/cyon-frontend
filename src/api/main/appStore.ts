import { createContext, useContext } from "react";
import { AuthenticationStore } from "../storeCollection/authenticationStore";
import { CommonStore } from "../storeCollection/commonStore";
import { AnnouncementStore } from "../storeCollection/announcementStore";
import { YearProgrammeStore } from "../storeCollection/yearprogrammeStore";
import { FinanceStore } from "../storeCollection/financeStore";
import { AttendanceStore } from "../storeCollection/attendanceStore";
import { MeetingStore } from "../storeCollection/meetingStore";

interface Store {
  commonStore: CommonStore;
  authenticationStore: AuthenticationStore;
  announcementStore: AnnouncementStore;
  yearProgrammeStore: YearProgrammeStore;
  financeStore: FinanceStore;
  attendanceStore: AttendanceStore;
  meetingStore: MeetingStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  authenticationStore: new AuthenticationStore(),
  announcementStore: new AnnouncementStore(),
  yearProgrammeStore: new YearProgrammeStore(),
  financeStore: new FinanceStore(),
  attendanceStore: new AttendanceStore(),
  meetingStore: new MeetingStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
