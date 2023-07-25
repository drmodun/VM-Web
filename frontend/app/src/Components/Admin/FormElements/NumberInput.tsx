import classes from "./FormElements.module.scss";

interface NumberInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NumberInput = (props: NumberInputProps) => {
  return (
    <div className={classes.Element}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="number"
        name={props.name}
        className={classes.Input}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};
