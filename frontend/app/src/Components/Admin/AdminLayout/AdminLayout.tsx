import { Outlet } from "react-router-dom";
import AdminNavigation from "../AdminNavigation";
//no point for the footer in the admin layout
export const AdminLayout = () => {
    return (
        <div>
            <AdminNavigation />
            <Outlet />
        </div>
    )
}