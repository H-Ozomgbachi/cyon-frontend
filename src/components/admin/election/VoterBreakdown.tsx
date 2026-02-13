import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { VoterRecord } from "../../../api/models/election";
import MySkeleton from "../../shared/loading-spinner/MySkeleton";
import { CompleteDateFormatter } from "../../../helpers/formatters";

interface Props {
  electionId: string;
  contestId: string;
  nomineeId: string;
  nomineeName: string;
  positionName: string;
}

type Order = "asc" | "desc";
type SortKey = "fullName" | "castAt";

export default observer(function VoterBreakdown({
  electionId,
  contestId,
  nomineeId,
  nomineeName,
  positionName,
}: Props) {
  const { electionStore } = useStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<SortKey>("castAt");

  useEffect(() => {
    electionStore.fetchVoterBreakdown(electionId, contestId, nomineeId);
  }, [electionStore, electionId, contestId, nomineeId]);

  const handleSort = (property: SortKey) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredVoters = electionStore.voterBreakdown
    .filter((v) =>
      v.fullName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[orderBy];
      const bVal = b[orderBy];
      if (order === "asc") {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      }
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    });

  const paginatedVoters = filteredVoters.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (electionStore.loadingVoterBreakdown) {
    return <MySkeleton count={3} />;
  }

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
        Voter Breakdown
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {positionName} — Voters for {nomineeName}
      </Typography>

      <TextField
        size="small"
        placeholder="Search voters..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
        sx={{ mb: 2 }}
        fullWidth
      />

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "fullName"}
                  direction={orderBy === "fullName" ? order : "asc"}
                  onClick={() => handleSort("fullName")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "castAt"}
                  direction={orderBy === "castAt" ? order : "asc"}
                  onClick={() => handleSort("castAt")}
                >
                  Voted At
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedVoters.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No voters found
                </TableCell>
              </TableRow>
            ) : (
              paginatedVoters.map((voter, index) => (
                <TableRow key={voter.userId}>
                  <TableCell>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell>{voter.fullName}</TableCell>
                  <TableCell>
                    {CompleteDateFormatter(voter.castAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredVoters.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
});
