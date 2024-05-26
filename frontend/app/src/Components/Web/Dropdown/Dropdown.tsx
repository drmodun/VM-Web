import React, { useEffect, useState } from "react";
import classes from "./Dropdown.module.scss";
import chevron_down from "../../../assets/chevron-down.svg";
import chevron_up from "../../../assets/chevron-up.svg";
interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  onSelect: (value: string) => void;
  cancel?: boolean;
  closer?: Function;
}

export const Dropdown = ({ options, onSelect, cancel, closer }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selected, setSelected] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>("Search");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelect = (value: string, label: string) => {
    setSelected(value);
    setSearchTerm("");
    setPlaceholder(label);
    onSelect(value);
    setVisible(false);
  };

  useEffect(() => {
    setVisible(false);
  }, [cancel]);

  return (
    <div className={classes.Dropdown}>
      <div
        className={`${visible ? classes.Active : ""} ${classes.Top} `}
        onClick={() => {
          closer && closer();
          setVisible((prev) => !prev);
        }}
      >
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleSearch}
          value={searchTerm}
        />
        <img
          src={!visible ? chevron_up : chevron_down}
          alt={!visible ? "close" : "open"}
        />
      </div>
      <div className={visible ? classes.Menu : classes.Hidden}>
        {
          <li
            key=""
            onClick={() => {
              setSelected("");
              setSearchTerm("");
              setPlaceholder("Search");
              onSelect("");
              setVisible(false);
            }}
          />
        }
        {options
          .filter((option) =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value, option.label)}
            >
              {option.label}
            </li>
          ))}
      </div>
    </div>
  );
};
