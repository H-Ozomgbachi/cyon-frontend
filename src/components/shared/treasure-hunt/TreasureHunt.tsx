import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";

export default observer(function TreasureHunt() {
  const { yearProgrammeStore } = useStore();

  return (
    <div onClick={yearProgrammeStore.postTreasureHuntResult}>
      <img
        alt="Img"
        src="https://cdn.britannica.com/17/242017-138-6E77601C/did-you-know-Pope-Francis.jpg?w=800&h=450&c=crop"
        style={{
          width: "60px",
          height: "60px",
        }}
      />
    </div>
  );
});
