import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useMediaQuery, useTheme } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type Props = {
  tabNames: string[];
  tabContents: ReactJSXElement[];
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 1, md: 2 } }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function HorizontalTabs({ tabNames, tabContents }: Props) {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant={isMobile ? "fullWidth" : "standard"}
          scrollButtons="auto"
          aria-label="basic tabs example"
          textColor="inherit"
          sx={{
            "& .MuiTab-root": {
              minHeight: { xs: 48, md: 64 },
              fontSize: { xs: "0.875rem", md: "1rem" },
              textTransform: "capitalize",
            },
          }}
        >
          {tabNames.map((el, i) => (
            <Tab key={i} label={el} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>
      {tabContents.map((el, i) => (
        <TabPanel key={i} value={value} index={i}>
          {el}
        </TabPanel>
      ))}
    </Box>
  );
}
