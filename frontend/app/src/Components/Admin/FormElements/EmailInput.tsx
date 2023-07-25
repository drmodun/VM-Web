import classes from "./FormElements.module.scss";
interface EmailInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EmailInput = ({
  label,
  name,
  value,
  onChange,
}: EmailInputProps) => {
  return (
    <div className={classes.Element}>
      <label htmlFor={name}>{label}</label>
      <input
        className={classes.Input}
        type="email"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
