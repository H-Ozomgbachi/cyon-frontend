import { Box, Button, CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Delete } from "@mui/icons-material";
import { useStore } from "../../../api/main/appStore";
import { YearProgrammeModel } from "../../../api/models/year-programme";

interface Props {
  data: YearProgrammeModel;
}

export default observer(function DeleteYearProgramme({ data }: Props) {
  const { yearProgrammeStore } = useStore();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Button
        type="button"
        variant="contained"
        color="error"
        startIcon={<Delete />}
        onClick={() => yearProgrammeStore.deleteYearProgramme(data.id!)}
      >
        {yearProgrammeStore.isDeletingYearProgramme ? (
          <CircularProgress color="inherit" />
        ) : (
          "Delete"
        )}
      </Button>
    </Box>
  );
});
