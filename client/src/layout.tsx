import { AdminNav } from "./components/adminNav";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "./state/store";

export function Layout() {
    const { user } = useAppSelector((state) => state.user);
    const { pathname } = useLocation();

    return (
        <>
            <Header />
            {user?.isAdmin && /^\/admin\//.test(pathname) && <AdminNav />}
            <Outlet />
            <Footer />
        </>
    );
}
