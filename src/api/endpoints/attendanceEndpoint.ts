import requests from "../main/apiConfig";
import {
  ApologyModel,
  ApologySummaryModel,
  AttendanceModel,
  AttendanceSummaryModel,
  AttendanceTypeModel,
  CreateApologyPayload,
  MarkAbsentees,
  TakeAttendance,
} from "../models/attendance";

export const Attendance = {
  getMyAttendanceRecord: () =>
    requests.get<AttendanceModel[]>(
      "/AttendanceRegister/GetMyAttendanceRecord"
    ),

  getMyApologyRecord: () =>
    requests.get<ApologyModel[]>("/Apology/GetUserApologies"),

  addApology: (values: CreateApologyPayload) =>
    requests.post<ApologyModel>("/Apology/AddApology", values),

  getPendingApologies: () =>
    requests.get<ApologyModel[]>("/Apology/GetPendingApologies"),

  approveApology: (payload: ApologyModel) =>
    requests.post("/Apology/ApproveApology", payload),

  declineApology: (payload: ApologyModel) =>
    requests.post("/Apology/DeclineApology", payload),

  deleteApology: (id: string) => requests.del(`/Apology/DeleteApology/${id}`),

  getAttendanceTypes: () =>
    requests.get<AttendanceTypeModel[]>("/attendanceTypes"),

  getAttendanceSummary: () =>
    requests.get<AttendanceSummaryModel>(
      "/AttendanceRegister/GetAttendanceSummary"
    ),

  getApologySummary: () =>
    requests.get<ApologySummaryModel>("/Apology/GetApologySummary"),

  takeAttendance: (payload: TakeAttendance) =>
    requests.post("/AttendanceRegister/TakeAttendance", payload),

  markAbsentees: (payload: MarkAbsentees) =>
    requests.post<string>("/AttendanceRegister/MarkAbsentees", payload),

  getTodayAttendance: () =>
    requests.get<AttendanceModel[]>("/AttendanceRegister/GetTodayAttendance"),
};
