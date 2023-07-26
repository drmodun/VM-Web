import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
//no point for the footer in the admin layout
export const Layout = () => {
    return (
        <div>
            <Navigation 
                setMenuOpen={() => {}}
                menuOpen={false}
                isLoggedIn={false}
            />
            <Outlet />
        </div>
    )
}