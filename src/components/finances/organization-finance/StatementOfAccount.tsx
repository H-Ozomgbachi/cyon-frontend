import { observer } from "mobx-react-lite";
import { OrganizationAccountStatementModel } from "../../../api/models/finance";
import { Divider } from "@mui/material";
import { NairaFormatter } from "../../../helpers/formatters";
import OrganizationFinanceCard from "./OrganizationFinanceCard";

interface Props {
  data: OrganizationAccountStatementModel;
}
export default observer(function StatementOfAccount({ data }: Props) {
  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <strong>From</strong>
        <span>{data.startDate}</span>
      </div>
      <div className="d-flex justify-content-between">
        <strong>To</strong>
        <span>{data.endDate}</span>
      </div>

      <Divider className="my-3" />

      <div className="d-flex justify-content-between mb-3">
        <strong>Prev. Balance</strong>
        <span>{NairaFormatter(data.balanceBroughtForward)}</span>
      </div>
      <div className="d-flex justify-content-between text-success">
        <strong>Balance At Hand</strong>
        <span>{NairaFormatter(data.balanceAtHand)}</span>
      </div>

      <Divider className="my-3" />

      {data.finances.map((el) => (
        <OrganizationFinanceCard key={el.id} data={el} />
      ))}
    </div>
  );
});
