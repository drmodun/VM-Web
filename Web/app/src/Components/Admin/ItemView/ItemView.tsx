import classes from "./ItemView.module.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//still have to decide if I keep ids visible or not
interface Props {
  item: Item;
  links: LinkableItem[];
  schema?: Item[];
}

interface Item {
  [key: string]: string | number;
}

interface LinkableItem extends Item {
  name: string;
  
  link: string;
}

//add later for images and stuff
export const ItemView = (props: Props) => {
  return (
    <div className={classes.Container}>
      {Object.keys(props.item).map((key: string) => {
        if (props.links.find((item) => item.name === key))
          return (
            <div className={classes.Attribute}>
              <h3>{key}</h3>
              <Link
                to={
                  props.links.find((item) => item.name === key)?.link as string
                }
              >
                {props.item[key]}
              </Link>
            </div>
          );
        return (
          <div className={classes.Attribute}>
            <h3>{key}</h3>
            <pre>{props.item[key]}</pre>
          </div>
        );
      })}
    </div>
  );
};
