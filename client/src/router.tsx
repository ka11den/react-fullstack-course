import { Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { MainPage } from "./pages/common/main";
import { NotFoundPage } from "./pages/error/notFound";
import { SigninPage } from "./pages/auth/signin";
import { SignupPage } from "./pages/auth/signup";
import { RestoreAccountPage } from "./pages/auth/restoreAccount";
import { ResetPasswordPage } from "./pages/auth/resetPassword";
import { ProfilePage } from "./pages/protected/profile";
import { PaymentPage } from "./pages/protected/payment";
import { CategoriesPage } from "./pages/toll/categories";
import { CategoryPage } from "./pages/toll/category";
import { VideoPage } from "./pages/toll/video";
import { UsersPanelPage } from "./pages/admin/usersPanel";
import { Layout } from "./layout";
import { useEffect } from "react";
import { useActions, useAppSelector } from "./state/store";
import Oferta from "./pages/oferta";
import Politics from "./pages/politics";

const unauthRoutes: CustomRoute[] = [
    {
        title: "Авторизация",
        path: "/signin",
        element: <SigninPage />
    }, {
        title: "Регистрация",
        path: "/signup",
        element: <SignupPage />
    }, {
        title: "Восстановление аккаунта",
        path: "/restore",
        element: <RestoreAccountPage />
    }, {
        title: "Сброс пароля",
        path: "/reset/:token",
        element: <ResetPasswordPage />
    }, {
        title: "Публичная оферта",
        path: "/oferta",
        element: <Oferta />
    }, {
        title: "Политика конфидециальности",
        path: "/politics",
        element: <Politics />
    }

]

const protectedRoutes: CustomRoute[] = [
    {
        title: "Личный кабинет",
        path: "/profile",
        element: <ProfilePage />
    }, {
        title: "Оплата подписки",
        path: "/payment",
        element: <PaymentPage />
    }
]

const tollRoutes: CustomRoute[] = [
    {
        title: "Категории",
        path: "/categories",
        element: <CategoriesPage />
    }, {
        title: "Категория",
        path: "/category/:id",
        element: <CategoryPage />
    }, {
        title: "Видеоролик",
        path: "/video/:id",
        element: <VideoPage />
    }
]

const adminRoutes: CustomRoute[] = [
    {
        title: "Управление пользователями",
        path: "/admin/users",
        element: <UsersPanelPage />
    }
]


export function AppRouter() {
    const isAdmin = true;
    const isPaid = false;

    const { user, isAuth } = useAppSelector((state) => state.user);
    const { getMyData } = useActions();

    useEffect(() => {
        if (!user) {
            getMyData();
        }
    }, [getMyData, user]);

    return (
        <HelmetProvider>
            <Helmet title="Базовой заголовок" />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<MainPage />} />
                    {unauthRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<>
                                <Helmet title={route.title} />
                                {route.element}
                            </>}
                        />
                    ))}
                    {isAuth && (<>
                        {protectedRoutes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<>
                                    <Helmet title={route.title} />
                                    {route.element}
                                </>}
                            />
                        ))}
                        {(isPaid || isAdmin) && tollRoutes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<>
                                    <Helmet title={route.title} />
                                    {route.element}
                                </>}
                            />
                        ))}
                        {isAdmin && adminRoutes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<>
                                    <Helmet title={route.title} />
                                    {route.element}
                                </>}
                            />
                        ))}
                    </>)}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </HelmetProvider>
    )
}
