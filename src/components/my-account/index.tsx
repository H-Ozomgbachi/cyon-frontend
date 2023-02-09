import { Person, Work, Settings } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import BottomNav from "../shared/bottom-nav";
import Department from "./Department";
import Occupation from "./Occupation";
import Profile from "./Profile";

export default observer(function MyAccount() {
  return (
    <BottomNav
      navItems={[
        {
          label: "Profile",
          icon: <Person />,
        },
        {
          label: "Occupation",
          icon: <Work />,
        },
        {
          label: "Settings",
          icon: <Settings />,
        },
      ]}
      contentItems={[<Profile />, <Occupation />, <Department />]}
    />
  );
});
