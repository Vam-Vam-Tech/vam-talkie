import Login from "../pages/login"
import { Navigate, useRoutes } from "react-router-dom"
import Register from "../pages/register"

const Guest = () => {
    return useRoutes([
        {
            path: "/",
            element: <Navigate to="login" replace />,
        },
        {
            path: "login",
            element: <Login />,
        },
        {
            path: "register",
            element: <Register />,
        },
        {
            path: "*",
            element: <Navigate to="/" />,
        },
    ])
}

export default Guest