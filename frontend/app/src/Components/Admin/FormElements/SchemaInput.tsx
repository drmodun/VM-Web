import { Indexable } from "../../../Types/Interfaces";
import classes from "./FormElements.module.scss";
interface SchemaInputProps {
  label: string;
  name: string;
  value: Indexable;
  onChange: Function;
}

export const SchemaInput = (props: SchemaInputProps) => {
  return (
    <div className={classes.Element}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className={classes.SchemaContainer}>
        {Object.keys(props.value).map((key: string) => {
          return (
            <div className={classes.SchemaAttribute}>
              <button
                className={classes.RemoveButton}
                type="button"
                onClick={() => {
                  const newSchema = { ...props.value };
                  delete Object.assign(newSchema, {
                    [key]: newSchema[key],
                  })[key];
                  props.onChange(newSchema);
                }}
              >
                x
              </button>
              <input
                className={classes.Input}
                type="text"
                value={key}
                onChange={(e) => {
                  props.onChange({
                    ...props.value,
                    [e.target.value]: props.value[key],
                  });
                }}
              />
              <input
                type="checkbox"
                value={props.value[key] === "required" ? 1 : 0}
                onChange={(e) => {
                  const newSchema = { ...props.value };
                  newSchema[key] = e.target.checked ? "required" : "optional";
                  props.onChange(newSchema);
                }}
              />
            </div>
          );
        })}
        <button
          type="button"
          className={classes.AddButton}
          onClick={() => {
            const newSchema = { ...props.value };
            newSchema[`newAttribute${Object.keys(newSchema).length}`] =
              "optional";
            props.onChange(newSchema);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};
