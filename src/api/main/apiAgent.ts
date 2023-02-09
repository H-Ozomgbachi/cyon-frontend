import { Announcement } from "../endpoints/announcementEndpoint";
import { Attendance } from "../endpoints/attendanceEndpoint";
import { Authentication } from "../endpoints/authenticationEndpoint";
import { Finance } from "../endpoints/financeEndpoint";
import { YearProgramme } from "../endpoints/yearprogrammeEndpoint";

const agent = {
  authentication: Authentication,
  announcement: Announcement,
  yearProgramme: YearProgramme,
  finance: Finance,
  attendance: Attendance,
};

export default agent;
