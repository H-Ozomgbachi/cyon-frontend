import { Box } from "@mui/material";
import ContentTitle from "../shared/content-title";
import SummaryCard from "../shared/summary-card";
import AttendanceCard from "./AttendanceCard";

const RESULTS = [
  {
    attendanceTypeId: "0b175d49-9acf-4dba-ea00-08dae9b0a584",
    attendanceTypeName: "Car Wash Exercise",
    dateAdded: "2023-01-05T08:58:25.748",
    userId: "1fbf8f64-6190-4faa-921d-c10d56fa0d90",
    userEmail: "henry@test.io",
    isPresent: true,
    rating: 5,
  },
  {
    attendanceTypeId: "0b175d49-9acf-4dba-ea00-08dae9b0a584",
    attendanceTypeName: "Deneary meeting",
    dateAdded: "2023-01-04T09:01:42.257",
    userId: "9fe03fb7-853a-4961-8955-bb78cab1c461",
    userEmail: "fabian@test.io",
    isPresent: false,
    rating: 0,
  },
  {
    attendanceTypeId: "0b175d49-9acf-4dba-ea00-08dae9b0a584",
    attendanceTypeName: "Church Cleanup",
    dateAdded: "2023-01-03T09:01:42.257",
    userId: "9fe03fb7-853a-4961-8955-bb78cab1c461",
    userEmail: "fabian@test.io",
    isPresent: true,
    rating: 4,
  },
  {
    attendanceTypeId: "0b175d49-9acf-4dba-ea00-08dae9b0a584",
    attendanceTypeName: "General meeting",
    dateAdded: "2023-01-02T09:01:42.257",
    userId: "9fe03fb7-853a-4961-8955-bb78cab1c461",
    userEmail: "fabian@test.io",
    isPresent: true,
    rating: 3,
  },
  {
    attendanceTypeId: "0b175d49-9acf-4dba-ea00-08dae9b0a584",
    attendanceTypeName: "3rd Thursday Fellowship",
    dateAdded: "2023-01-01T09:01:42.257",
    userId: "9fe03fb7-853a-4961-8955-bb78cab1c461",
    userEmail: "fabian@test.io",
    isPresent: false,
    rating: 0,
  },
];

export default function AttendanceRecord() {
  return (
    <Box>
      <SummaryCard
        firstTitle="Presence"
        firstValue={"80%"}
        secondTitle="Absence"
        secondValue={"20%"}
      />

      <ContentTitle title="Details" />

      {RESULTS.map((el, i) => (
        <AttendanceCard key={i} data={el} />
      ))}
    </Box>
  );
}
