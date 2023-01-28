import { Create } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import ContentTitle from "../shared/content-title";
import SummaryCard from "../shared/summary-card";
import ApologyCard from "./ApologyCard";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import AddApology from "./AddApology";

const RESULTS = [
  {
    id: "d85c44f6-aa87-4df6-c841-08daeaa166ec",
    for: "Car Wash Exercise",
    attendanceTypeId: "0b175d49-9acf-4dba-ea00-08dae9b0a584",
    date: "2022-12-30T20:05:25.939",
    reason: "I am going work",
    isRejected: false,
    rejectionReason: "",
    isResolved: false,
    userId: "9fe03fb7-853a-4961-8955-bb78cab1c461",
    userEmail: "fabian@test.io",
  },
  {
    id: "d85c44f6-aa87-4df6-c841-08daeaa166ec",
    for: "Meeting",
    attendanceTypeId: "0b175d49-9acf-4dba-ea00-08dae9b0a584",
    date: "2022-12-30T20:05:25.939",
    reason: "I am going work",
    isRejected: true,
    rejectionReason: "",
    isResolved: false,
    userId: "9fe03fb7-853a-4961-8955-bb78cab1c461",
    userEmail: "fabian@test.io",
  },
  {
    id: "d85c44f6-aa87-4df6-c841-08daeaa166ec",
    for: "Security",
    attendanceTypeId: "0b175d49-9acf-4dba-ea00-08dae9b0a584",
    date: "2022-12-30T20:05:25.939",
    reason: "I am going work",
    isRejected: false,
    rejectionReason: "",
    isResolved: false,
    userId: "9fe03fb7-853a-4961-8955-bb78cab1c461",
    userEmail: "fabian@test.io",
  },
  {
    id: "d85c44f6-aa87-4df6-c841-08daeaa166ec",
    for: "Car Wash Exercise",
    attendanceTypeId: "0b175d49-9acf-4dba-ea00-08dae9b0a584",
    date: "2022-12-30T20:05:25.939",
    reason: "I am going work",
    isRejected: true,
    rejectionReason: "",
    isResolved: false,
    userId: "9fe03fb7-853a-4961-8955-bb78cab1c461",
    userEmail: "fabian@test.io",
  },
];

export default observer(function ApologyRecord() {
  const { commonStore } = useStore();

  return (
    <Box>
      <SummaryCard
        firstTitle="Approved"
        firstValue={"80%"}
        secondTitle="Declined"
        secondValue={"20%"}
      />

      <ContentTitle title="Details" />

      {RESULTS.map((el, i) => (
        <ApologyCard key={i} data={el} />
      ))}

      <Box
        sx={{
          position: "sticky",
          bottom: "16%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Fab
          size="medium"
          aria-label="add"
          onClick={() =>
            commonStore.setModalContent(<AddApology />, "Send An Apology")
          }
        >
          <Create
            sx={{
              color: "rgb(150, 114, 23)",
            }}
          />
        </Fab>
      </Box>
    </Box>
  );
});
