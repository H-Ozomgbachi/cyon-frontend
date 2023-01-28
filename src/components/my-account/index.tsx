import { Person, Work, MeetingRoom } from "@mui/icons-material";
import BottomNav from "../shared/bottom-nav";
import Department from "./Department";
import Occupation from "./Occupation";
import Profile from "./Profile";

export default function MyAccount() {
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
          label: "Department",
          icon: <MeetingRoom />,
        },
      ]}
      contentItems={[<Profile />, <Occupation />, <Department />]}
    />
  );
}
