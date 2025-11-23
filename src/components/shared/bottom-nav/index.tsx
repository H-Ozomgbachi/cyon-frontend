import React from "react";
import "./BottomNav.css";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Container,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ pb: { xs: 7, md: 0 } }} ref={ref}>
      {/* Desktop Tabs - Horizontal at top */}
      {!isMobile && (
        <Paper elevation={2} sx={{ mb: 2, position: "sticky", top: 64, zIndex: 100 }}>
          <Container maxWidth="xl">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTab-root": {
                  minHeight: 64,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                },
              }}
            >
              {navItems.map((el, i) => (
                <Tab
                  key={i}
                  icon={el.icon}
                  label={el.label}
                  iconPosition="start"
                  sx={{
                    "&.Mui-selected": {
                      color: theme.palette.secondary.main,
                      fontWeight: 700,
                    },
                  }}
                />
              ))}
            </Tabs>
          </Container>
        </Paper>
      )}

      {/* Content */}
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
        <div>{contentItems[value]}</div>
      </Container>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
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
      )}
    </Box>
  );
}

