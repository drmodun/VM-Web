import classes from "./TextAreaInput.module.scss";
interface Props {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}


export const AreaInput = ({
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
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          rows={5}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
