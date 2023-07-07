import { CopyAll } from "@mui/icons-material";
import { Button, FormControl, Paper, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { useStore } from "../../../api/main/appStore";

export default observer(function GroupResult() {
  const textareaRef = useRef<HTMLDivElement>(null);
  const { accountManagementStore, commonStore } = useStore();

  const handleClick = () => {
    navigator.clipboard.writeText(accountManagementStore.groupsResult);
    window.scrollTo(0, 0);
    commonStore.setAlertText("Grops copied to clipboard");
  };

  return (
    <Paper
      ref={textareaRef}
      sx={{
        p: 1,
      }}
    >
      <FormControl fullWidth>
        <TextField
          defaultValue={accountManagementStore.groupsResult}
          multiline
          rows={7}
          color="warning"
          variant="standard"
          label="Result"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={accountManagementStore.groupsResult === ""}
          className="mt-3 uni-green_btn"
          startIcon={<CopyAll />}
          onClick={handleClick}
        >
          Copy
        </Button>
      </FormControl>
    </Paper>
  );
});
