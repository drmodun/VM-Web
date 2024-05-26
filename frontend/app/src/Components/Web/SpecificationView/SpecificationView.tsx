import { Indexable } from "../../../Types/Interfaces";
import classes from "./SpecificationView.module.scss";
interface Props {
  specs: Indexable;
  subSpecs?: Indexable;
}

export const SpecificationView = ({ specs, subSpecs }: Props) => {
  return (
    <div className={classes.Container}>
      <h1>Specifikacije</h1>
      <div className={classes.SpecsContainer}>
        <div className={classes.Specs}>
          {Object.keys(specs).map((key) => (
            <div className={classes.Spec}>
              <span className={classes.Key}>{key}</span>
              <span className={classes.Divider} />
              <span className={classes.Value}>{specs[key]}</span>
            </div>
          ))}
        </div>
        {subSpecs && (
          <div className={classes.Specs}>
            {Object.keys(subSpecs).map((key) => (
              subSpecs[key] && (
                <div className={classes.Spec}>
                  <span className={classes.Key}>{key}</span>
                  <span className={classes.Divider} />
                  <span className={classes.Value}>{subSpecs[key]}</span>
                </div>)
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
