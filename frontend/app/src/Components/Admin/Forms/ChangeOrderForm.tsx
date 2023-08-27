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

interface Props {
  isEdit?: boolean;
  item?: Order;
  reload: Function;
}

export const CategoryForm = ({ isEdit, item, reload }: Props) => {
  const [type, setType] = useState<StatusType>(item!.statusType);
  const [deadline, setDeadline] = useState<Date | undefined>(
    isEdit ? item!.deadline : new Date()
  );
  const [status, setStatus] = useState<string>("");

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("Loading...");
    const newOrder: UpdateOrderInfo = {
      id: item!.id,
      statusType: type,
      deadline,
    };

    const response = await updateOrderInfo(newOrder);
    response
      ? setStatus("Action performed successfully")
      : setStatus("Something went wrong");
  };
  //gotta fix the resizing problem

  return (
    <div className={classes.Form}>
      <h1>{isEdit ? "Edit" : "Create"} Category</h1>
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
          ]}/>
        <button type="submit">{isEdit ? "Edit" : "Create"} Category</button>
      </form>
      <div className={classes.Status}>{status}</div>
    </div>
  );
};
