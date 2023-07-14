import classes from './AdminNavigation.module.scss';
import { NavLink } from 'react-router-dom';

export const AdminNavigation = () => {
    return (
        <nav className={classes.AdminNavigation}>
            <ul>
                <li>
                    <NavLink to="/admin">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/products">Products</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/categories">Categories</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/subcategories">Subcategories</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/companies">Companies</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/users">Users</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/orders">Orders</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/transactions">Transactions</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/previousClients">Previous Clients</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/services">Services</NavLink>
                </li>
            </ul>
        </nav>

    )
}