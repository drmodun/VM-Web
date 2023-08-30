import classes from "./404.module.scss";
export const NotFoundPage = () => {
    return (
       <div className={classes.Container}>
        <div className={classes.Text}>
            <span className={classes.Title}>
                404 resource not found
            </span>
            <span className={classes.Subtitle}>
                The page you are looking for does not exist.
            </span>
            <a href="/">
                Go back to home page
            </a>
        </div>

       </div>
    )
}