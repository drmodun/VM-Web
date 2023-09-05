import classes from "./LargeInput.module.scss";
interface Props {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const LargeInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
}: Props) => {

  return (
    <div className={classes.Input}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.InputContainer}>
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
