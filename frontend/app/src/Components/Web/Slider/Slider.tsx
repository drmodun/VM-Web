import classes from "./Slider.module.scss";
import { useEffect, useState, useRef } from "react";

interface Props {
  label: string;
  minValue: number;
  maxValue: number;
  onBottomChange: (value: number) => void;
  onTopChange: (value: number) => void;
}

export const Slider = ({
  label,
  minValue,
  maxValue,
  onBottomChange,
  onTopChange,
}: Props) => {
  const [bottomValue, setBottomValue] = useState<number>(minValue);
  const [topValue, setTopValue] = useState<number>(maxValue);
  const getWidth = useRef<HTMLDivElement | null>(null);

  const handleBottomValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const value =
      Number(event.target.value) < minValue
        ? minValue
        : Number(event.target.value);
    setBottomValue(value > topValue ? bottomValue : value);
  };

  const handleTopValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value =
      Number(event.target.value) > maxValue
        ? maxValue
        : Number(event.target.value);
    setTopValue(value < bottomValue ? topValue : value);
  };

  useEffect(() => {
    onBottomChange(bottomValue);
    onTopChange(topValue);
  }, [bottomValue, topValue]);

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
      <div className={classes.Slider} ref={getWidth}>
        <div
          className={classes.SliderFill}
          style={{
            width: `${
              ((topValue - bottomValue) / (maxValue - minValue)) * 160 + 40
            }px`,
            left: `${
              ((bottomValue - minValue) / (maxValue - minValue)) * 160
            }px`,
            right: `${((maxValue - topValue) / (maxValue - minValue)) * 160}px`,
          }}
        >
          <div
            draggable={true}
            className={classes.SliderHandle}
            onDrag={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const left = Number(
                getWidth.current?.getBoundingClientRect().left
              );
              let width = Number(
                window.getComputedStyle(getWidth.current!).width.split("p")[0]
              );
              let midWidth = Number(
                event.currentTarget.parentElement!.style.width.split("p")[0]
              );
              const value =
                Number(event.clientX) - left > width
                  ? width
                  : Number(event.clientX) - left;
              if (value <= 0) return;
              //  console.log(event.clientX);
              console.log("width", width, midWidth, value, left);
              console.log(
                event.currentTarget.parentElement!.style.width.split("p")[0]
              );
              console.log(Math.round((value / midWidth) * topValue));
              setBottomValue(
                Math.round((value / width) * maxValue) > topValue
                  ? topValue
                  : Math.round((value / width) * maxValue)
              );
              //   setTopValue(
              //     topValue -
              //       Number (event.clientX) /
              //         Number(event.currentTarget.parentElement!.style.width.split("p")[0]) *
              //         (maxValue - minValue)
              //   );
            }}
          ></div>
          <div
            draggable={true}
            className={classes.SliderHandle}
            onDrag={(event) => {
              event.preventDefault();
              event.stopPropagation();
              const left = Number(
                getWidth.current?.getBoundingClientRect().left
              );
              let width = Number(
                window.getComputedStyle(getWidth.current!).width.split("p")[0]
              );
              let midWidth = Number(
                event.currentTarget.parentElement!.style.width.split("p")[0]
              );
              const value =
                Number(event.clientX) - left > width
                  ? width
                  : Number(event.clientX) - left;
              if (value <= 0) return;
              //  console.log(event.clientX);
              console.log(
                "width",
                width,
                midWidth,
                value,
                getWidth.current?.getBoundingClientRect()
              );
              console.log(
                event.currentTarget.parentElement!.style.width.split("p")[0]
              );
              console.log(
                Math.round(value / midWidth) * (topValue - bottomValue)
              );
              setTopValue(
                Math.round((value / width) * maxValue) > maxValue
                  ? maxValue
                  : Math.round((value / width) * maxValue) < bottomValue
                  ? bottomValue
                  : Math.round((value / width) * maxValue)
              );
              //   setTopValue(
              //     topValue -
              //       Number (event.clientX) /
              //         Number(event.currentTarget.parentElement!.style.width.split("p")[0]) *
              //         (maxValue - minValue)
              //   );
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
