type AppRouter = {
    path: string;
    element: JSX.Element;
    isAuthenticated: boolean;
}

type CustomRoute = {
    title: string,
    path: string,
    element: JSX.Element
}

type FAQ = {
    title: string;
    answer: string;
    isActive: boolean;
}
