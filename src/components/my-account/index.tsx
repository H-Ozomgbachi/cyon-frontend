import { Person, Work, MoreHoriz } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import BottomNav from "../shared/bottom-nav";
import Occupation from "./Occupation";
import Profile from "./Profile";
import More from "./More";

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
          label: "More",
          icon: <MoreHoriz />,
        },
      ]}
      contentItems={[<Profile />, <Occupation />, <More />]}
    />
  );
});
