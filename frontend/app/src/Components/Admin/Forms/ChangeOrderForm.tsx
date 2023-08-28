import { useState } from "react";
import classes from "./Forms.module.scss";
import Inputs from "../FormElements";
import {
  NewCategory,
  Category,
  createCategory,
  updateCategory,
} from "../../../Api/CategoryApi";
import { Indexable } from "../../../Types/Interfaces";
import { Order, UpdateOrderInfo, updateOrderInfo } from "../../../Api/OrderApi";
import { StatusType } from "../../../Types/Enums";
import Input from "../../Web/Input";

interface Props {
  isEdit?: boolean;
  item?: Order;
  reload: Function;
}

export const ChangeOrderForm = ({ isEdit, item, reload }: Props) => {
  const [type, setType] = useState<StatusType>(item!.statusType);
  const [note, setNote] = useState<string>("");
  const [deadline, setDeadline] = useState<Date | undefined>(
    item!.deadline != null
      ? new Date(new Date(item?.deadline!).toString().substring(0, 10))
      : undefined
  );
  //TODO: add info about dates
  const [status, setStatus] = useState<string>("");

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("Loading...");
    const newOrder: UpdateOrderInfo = {
      status: type,
      deadline,
      note,
    };

    const response = await updateOrderInfo(item?.id!, newOrder);
    response
      ? setStatus("Action performed successfully")
      : setStatus("Something went wrong");
    response && alert("Email attempted");
    response && reload();
  };
  //gotta fix the resizing problem

  return (
    <div className={classes.Form}>
      <h1>Update order</h1>
      <form onSubmit={handleSumbit}>
        <Inputs.SelectInput
          label="Status"
          name="status"
          value={type}
          onChange={(e) => setType(Number(e.target.value))}
          options={[
            { value: Number(StatusType.Pending), label: "Pending" },
            { value: Number(StatusType.InProgress), label: "In Progress" },
            { value: Number(StatusType.Completed), label: "Completed" },
            { value: Number(StatusType.Failed), label: "Failed" },
            { value: Number(StatusType.Rejected), label: "Rejected" },
            { value: Number(StatusType.Accepted), label: "Accepted" },
          ]}
        />
        <Inputs.LargeTextInput
          label="Note"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <span className={classes.DateSpan}>Update deadline</span>
        <input
          type="date"
          name="deadline"
          value={String(deadline)}
          onChange={(e) => setDeadline(new Date(e.target.value))}
        />
        {deadline && (
          <span className={classes.DateSpan}>
            Current deadline: {deadline!.toISOString()
            .toString().substring(0, 10)}
          </span>
        )}{" "}
        <button type="submit">{"Send email and update"} Order</button>
      </form>
      <div className={classes.Status}>{status}</div>
    </div>
  );
};
