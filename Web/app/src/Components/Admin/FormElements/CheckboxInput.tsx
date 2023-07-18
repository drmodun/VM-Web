import classes from "./FormElements.module.scss";
interface CheckboxInputProps {
  label: string;
  name: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxInput = ({
  label,
  name,
  value,
  onChange,
}: CheckboxInputProps) => {
  return (
    <div className={classes.CheckboxContainer}>
      <label htmlFor={name}>{label}</label>
      <input
        className={classes.CheckboxInput}
        type="checkbox"
        name={name}
        checked={value}
        onChange={onChange}
      />
    </div>
  );
};
