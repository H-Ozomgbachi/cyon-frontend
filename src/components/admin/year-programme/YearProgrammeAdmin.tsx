import { Box, Fab } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { Create } from "@mui/icons-material";
import ContentTitle from "../../shared/content-title";
import { useEffect } from "react";
import MySkeleton from "../../shared/loading-spinner/MySkeleton";
import DeleteYearProgramme from "./DeleteYearProgramme";
import YearProgrammeCardAdmin from "./YearProgrammeCardAdmin";
import CreateYearProgramme from "./CreateYearProgramme";

export default observer(function YearProgrammeAdmin() {
  const { yearProgrammeStore, commonStore } = useStore();

  useEffect(() => {
    if (yearProgrammeStore.yearProgrammes.length === 0) {
      yearProgrammeStore.getCurrentYearProgrammes();
    }
  }, [yearProgrammeStore]);

  return (
    <Box>
      <ContentTitle title="Year Programme" />

      {yearProgrammeStore.loadingYearProgrammes ? (
        <MySkeleton count={3} />
      ) : (
        yearProgrammeStore.yearProgrammes.map((el, i) => (
          <div
            onClick={() =>
              commonStore.setModalContent(
                <DeleteYearProgramme data={el} />,
                `Do you want to delete ${el.title}`
              )
            }
            key={el.id}
          >
            <YearProgrammeCardAdmin data={el} />
          </div>
        ))
      )}

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
            commonStore.setModalContent(
              <CreateYearProgramme />,
              "Create Year Programme",
              true
            )
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
