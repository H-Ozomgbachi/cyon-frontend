import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { useEffect } from "react";
import { DateAndTimeFormat } from "../../../helpers/formatters";

const TreasureHuntResultAdmin: React.FC = observer(() => {
  const { yearProgrammeStore } = useStore();
  useEffect(() => {
    yearProgrammeStore.getTreasureHuntResult();
  }, [yearProgrammeStore]);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
          }}
          aria-label="beautiful table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Tel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {yearProgrammeStore.treasureResults.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.founderName}</TableCell>
                <TableCell>{DateAndTimeFormat(row.dateAdded)}</TableCell>
                <TableCell>{row.founderPhone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
});

export default TreasureHuntResultAdmin;
