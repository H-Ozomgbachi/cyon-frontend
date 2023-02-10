import { Announcement } from "../endpoints/announcementEndpoint";
import { Attendance } from "../endpoints/attendanceEndpoint";
import { Authentication } from "../endpoints/authenticationEndpoint";
import { Department } from "../endpoints/departmentEndpoint";
import { Finance } from "../endpoints/financeEndpoint";
import { Meeting } from "../endpoints/meetingEndpoint";
import { Occupation } from "../endpoints/occupationEndpoint";
import { YearProgramme } from "../endpoints/yearprogrammeEndpoint";

const agent = {
  authentication: Authentication,
  announcement: Announcement,
  yearProgramme: YearProgramme,
  finance: Finance,
  attendance: Attendance,
  meeting: Meeting,
  occupation: Occupation,
  department: Department,
};

export default agent;
