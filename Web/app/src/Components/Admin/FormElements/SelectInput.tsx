import classes from "./FormElements.module.scss";

interface Option{
    value: string | number;
    label: string;
}

interface SelectInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

export const SelectInput = (props: SelectInputProps) => {
  return (
    <div className={classes.Element}>
      <label htmlFor={props.name}>{props.label}</label>
      <select
        name={props.name}
        className={classes.Select}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
