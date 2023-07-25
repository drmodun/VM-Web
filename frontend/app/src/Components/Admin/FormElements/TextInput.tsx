import classes from "./FormElements.module.scss";
interface TextInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = (props: TextInputProps) => {
  return (
    <div className={classes.Element}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="text"
        name={props.name}
        className={classes.Input}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};
