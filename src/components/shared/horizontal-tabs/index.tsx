import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

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
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="basic tabs example"
          textColor="inherit"
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
