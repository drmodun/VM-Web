import React, { useState } from "react";
import { SortAttributeType } from "../../../Types/Enums";
import chevron_down from "../../../assets/chevron-down.svg";
import chevron_up from "../../../assets/chevron-up.svg";
import classes from "./Switch.module.scss";
interface Option {
  label: string;
  value: number;
}
interface Props {
  options: Option[];
  onSwitch: (value: number) => void;
  closeOthers?: () => void;
  close?: boolean;
}

export const Switch = ({ options, onSwitch, closeOthers, close }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    options[0].label
  );
  return (
    <div className={classes.Container}>
      <div className={classes.Main}>
        <button
          className={classes.Open}
          onClick={() => setVisible((prev) => !prev)}
        >
          {selectedOption}
          {visible ? (
            <img src={chevron_up} alt="close" />
          ) : (
            <img src={chevron_down} alt="open" />
          )}
        </button>
      </div>
      {visible && (
        <div className={classes.Options}>
          {options.map((option) => (
            <button
              className={classes.Option}
              onClick={() => {
                setVisible(false);
                setSelectedOption(option.label);
                onSwitch(option.value);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
