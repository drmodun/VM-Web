import classes from './AdminNavigation.module.scss';
import { NavLink } from 'react-router-dom';

export const AdminNavigation = () => {
    return (
        <nav className={classes.AdminNavigation}>
            <ul>
                <li>
                    <NavLink className={classes.Link} to="/admin">Home</NavLink>
                </li>
                <li>
                    <NavLink className={classes.Link} to="/admin/products">Products</NavLink>
                </li>
                <li>
                    <NavLink className={classes.Link} to="/admin/categories">Categories</NavLink>
                </li>
                <li>
                    <NavLink className={classes.Link} to="/admin/subcategories">Subcategories</NavLink>
                </li>
                <li>
                    <NavLink className={classes.Link} to="/admin/companies">Companies</NavLink>
                </li>
                <li>
                    <NavLink className={classes.Link} to="/admin/users">Users</NavLink>
                </li>
                <li>
                    <NavLink className={classes.Link} to="/admin/orders">Orders</NavLink>
                </li>
                <li>
                    <NavLink className={classes.Link} to="/admin/transactions">Transactions</NavLink>
                </li>
                <li>
                    <NavLink className={classes.Link} to="/admin/previousClients">Previous Clients</NavLink>
                </li>
                <li>
                    <NavLink className={classes.Link} to="/admin/services">Services</NavLink>
                </li>
            </ul>
        </nav>

    )
}