import classes from "./Slider.module.scss";
import { useEffect, useState } from "react";

interface Props {
  label: string;
  minValue: number;
  maxValue: number;
  onChange: (value: string) => void;
}

export const Slider = ({ label, minValue, maxValue, onChange }: Props) => {
  const [bottomValue, setBottomValue] = useState<number>(minValue);
  const [topValue, setTopValue] = useState<number>(maxValue);

  const handleBottomValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const value =
      Number(event.target.value) < minValue
        ? minValue
        : Number(event.target.value);
    setBottomValue(value > topValue ? bottomValue : value);
    onChange(event.target.value);
  };

  const handleTopValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value =
      Number(event.target.value) > maxValue
        ? maxValue
        : Number(event.target.value);
    setTopValue(value < bottomValue ? topValue : value);
    onChange(event.target.value);
  };

  useEffect(() => {
    setBottomValue(minValue);
    setTopValue(maxValue);
  }, [minValue, maxValue]);

  useEffect(() => {
    setBottomValue(minValue);
    setTopValue(maxValue);
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.Label}>
        <span>{label}</span>
      </div>
      <div className={classes.Input}>
        <input
          type="number"
          placeholder={String(minValue)}
          onChange={(event) => handleBottomValueChange(event)}
          value={bottomValue}
        />
        <div className={classes.Divider}></div>
        <input
          type="number"
          placeholder={String(maxValue)}
          onChange={(event) => handleTopValueChange(event)}
          value={topValue}
        />
      </div>
      {/* <div className={classes.Range}>
            <input
                type="range"
                min={minValue}
                max={topValue}
                value={bottomValue}
                onChange={(event) => {
                    setBottomValue(event.target.value);
                    onChange(event.target.value);
                }}
            />
            <input
                type="range"
                min={bottomValue}
                max={maxValue}
                value={topValue}
                onChange={(event) => {
                    setTopValue(event.target.value);
                    onChange(event.target.value);
                }}
            /> */}
      <div className={classes.Slider}>
        <div
          className={classes.SliderFill}
          style={{
            width: `${
              ((topValue - bottomValue) / (maxValue - minValue)) * 180 + 40
            }px`,
            left: `${
              ((bottomValue - minValue) / (maxValue - minValue)) * 180
            }px`,
            right: `${((maxValue - topValue) / (maxValue - minValue)) * 180}px`,
          }}
        >
          <div
            draggable={true}
            className={classes.SliderHandle}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              console.log(event);

              setBottomValue(Number(event) + bottomValue);
            }}
          ></div>
          <div
            draggable={true}
            className={classes.SliderHandle}
            onDrag={(event) => {
              event.preventDefault();
              event.stopPropagation();
              console.log(event);
              event.currentTarget.style.position = "absolute";
              event.currentTarget.style.right = `${
                180 - event.clientX > 0 ? 220 - event.clientX : 0
              }px`;
              console.log(event.currentTarget.style.right);
              console.log(event.clientX);
            }}
            onDragEnd={(event) => {
              event.preventDefault();
              event.stopPropagation();
              console.log(event);
              event.currentTarget.style.position = "absolute";
              const higher = 180 - event.clientX;
              const lower = 40;
              event.currentTarget.style.right = `${
                180 - event.clientX > 0 ? 220 - event.clientX : 0
              }px`;
              console.log(event.currentTarget.style.right);
              console.log(event.clientX);
              setTopValue(maxValue);
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
