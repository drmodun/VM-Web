import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navigation from "../Navigation";
import SideMenu from "../SideMenu";
import { useState } from "react";
//no point for the footer in the admin layout
export const Layout = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    }

    const openMenu = () => {
        setMenuOpen(true);
    }


    return (
        <div>
            <Navigation 
                setMenuOpen={openMenu}
                menuOpen={false}
                isLoggedIn={false}
            />
            { menuOpen &&
            <SideMenu
                closeMenu={closeMenu}
                menuOpen={menuOpen}
                isLoggedIn={false}     
            />
            }
            <Outlet />
            <Footer />
        </div>
    )
}