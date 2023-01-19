import React from "react";
import "./BottomNav.css";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface NavProps {
  label: string;
  icon: ReactJSXElement;
}

type Props = {
  navItems: NavProps[];
  contentItems: ReactJSXElement[];
};

export default function BottomNav({ navItems, contentItems }: Props) {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [value]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <div>{contentItems[value]}</div>

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          {navItems.map((el, i) => (
            <BottomNavigationAction
              key={i}
              className={value === i ? "active-control" : ""}
              label={el.label}
              icon={el.icon}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
