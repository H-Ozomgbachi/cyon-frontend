import requests from "../main/apiConfig";
import {
  ApologyModel,
  AttendanceModel,
  AttendanceTypeModel,
  CreateApologyPayload,
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

  getAttendanceTypes: () =>
    requests.get<AttendanceTypeModel[]>("/attendanceTypes"),
};
