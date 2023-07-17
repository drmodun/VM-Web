import classes from "./DecimalNumberInput.module.scss";
interface LargeTextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const LargeTextInput = (props: LargeTextInputProps) => {
  return (
    <div className={classes.Element}>
      <label htmlFor={props.name}>{props.label}</label>
      <textarea
        name={props.name}
        className={classes.Input}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};
