import classes from "./DecimalNumberInput.module.scss";
interface PictureInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PictureInput = (props: PictureInputProps) => {
  return (
    <div className={classes.Element}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="file"
        name={props.name}
        className={classes.Input}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};
