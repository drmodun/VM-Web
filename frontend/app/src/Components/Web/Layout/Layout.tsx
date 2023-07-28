import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navigation from "../Navigation";
import SideMenu from "../SideMenu";
import { useState } from "react";
import { accountInfo } from "../../../Api/Shared";
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
                isLoggedIn={accountInfo !== null}
                userName={accountInfo?.name}
            />
            { menuOpen &&
            <SideMenu
                closeMenu={closeMenu}
                menuOpen={menuOpen}
                isLoggedIn={accountInfo !== null}
                userName={accountInfo?.name}     
            />
            }
            <Outlet />
            <Footer />
        </div>
    )
}