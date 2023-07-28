import classes from "./Input.module.scss";
import { useState } from "react";
interface Props {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  icon1?: string;
  icon2?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Input = ({
  label,
  name,
  type,
  placeholder,
  value,
  icon1,
  icon2,
  onChange,
}: Props) => {
  const [iconOn, setIconOn] = useState(false);
  const [typeInput, setType] = useState(type);

  const toggleIcon = () => {
    setIconOn((prev) => !prev);
    if (typeInput === "password") {
      setType("text");
      return;
    }
    setType("password");
  };

  return (
    <div className={classes.Input}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.InputContainer}>
        <input
          type={typeInput}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {icon1 && icon2 && (
          <div className={classes.Icon} onClick={toggleIcon}>
            <img src={!iconOn ? icon1 : icon2} alt="icon" />
          </div>
        )}
        {icon1 && !icon2 && (
          <div className={classes.Icon}>
            <img src={icon1} alt="icon" />
          </div>
        )}
      </div>
    </div>
  );
};
