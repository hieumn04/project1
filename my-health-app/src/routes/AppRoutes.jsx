
import { Suspense } from "react";
import StandardLayout from "../layouts/StandardLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import { Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";




export const routes = [
    {
        path : '/',
        element: (
            <Suspense fallback={<LoadingSpinner/>}>   
                    <StandardLayout/>

            </Suspense>

        ),
        children : [
            { index: true, element: <Home /> },
            {
                path: "login",
                element: <Login/>,
            },
            // {
            //     path: "register",
            //     element: <Register />,
            // },
            // {
            //     path: "forgot-password",
            //     element: <ForgotPassword />,
            // }
        ]

    }
]