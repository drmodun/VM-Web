import { Link } from "react-router-dom";
import classes from "./ItemTable.module.scss";
interface Props {
  items: Item[];
  links: LinkableItem[];
  important: string[];
  deleteItem?: Function;
  type: string;
}

interface LinkableItem extends Item {
  name: string;
  link: string;
}

export interface Item {
  [key: string]: string | number;
}

export const ItemTable = (props: Props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.TableHeader}>
        {props.important.map((key: string) => {
          return <h3>{key}</h3>;
        })}
        <h3>Actions</h3>
      </div>
      {props.items.map((item: Item) => {
        return (
          <div className={classes.Item}>
            {Object.keys(item).map((key: string) => {
              if (!props.important.includes(key)) return null;
              if (props.links.find((item) => item.name === key))
                return (
                  <div className={classes.Attribute}>
                    <Link
                      to={
                        props.links.find((item) => item.name === key)
                          ?.link as string
                      }
                    >
                      {item[key]}
                    </Link>
                  </div>
                );
              return (
                <div className={classes.Attribute}>
                  <p>{item[key]}</p>
                </div>
              );
            })}
            <div className={classes.Buttons}>
              <Link to={`/admin/${props.type}/${item.id}`}>
                <button className={classes.EditButton}>Edit</button>
              </Link>
              <button
                className={classes.DeleteButton}
                onClick={() => props.deleteItem?.(item.id)}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
