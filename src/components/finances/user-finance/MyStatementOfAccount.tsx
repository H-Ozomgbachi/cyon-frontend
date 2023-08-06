import { observer } from "mobx-react-lite";
import { UserFinanceModel } from "../../../api/models/finance";
import { Divider } from "@mui/material";
import PersonalFinanceCard from "./PersonalFinanceCard";
import { DateOnlyFormatter } from "../../../helpers/formatters";

interface Props {
  data: UserFinanceModel[];
  startDate: string;
  endDate: string;
}
export default observer(function MyStatementOfAccount({
  data,
  startDate,
  endDate,
}: Props) {
  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <strong>From</strong>
        <span>{DateOnlyFormatter(startDate)}</span>
      </div>
      <div className="d-flex justify-content-between">
        <strong>To</strong>
        <span>{DateOnlyFormatter(endDate)}</span>
      </div>

      <Divider className="my-3" />

      {data.map((el) => (
        <PersonalFinanceCard key={el.id} data={el} />
      ))}
    </div>
  );
});
