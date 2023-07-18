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
    <div className={classes.TextInputContainer}>
      <label htmlFor={name}>{label}</label>
      <input
        className={classes.TextInput}
        type="email"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
