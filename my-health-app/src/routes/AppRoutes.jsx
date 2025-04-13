
import { Suspense } from "react";
import StandardLayout from "../layouts/StandardLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import { Outlet, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { PrivateRoute } from "../components/PrivateRoute";
import PublicLayout from "../components/PublicLayout";
import LandingPage from "../pages/LandingPage";






export const routes = [
    {
        path : '/',
        element: (
            <Suspense fallback={<LoadingSpinner/>}>   
                <PublicLayout>
                    <LandingPage/>
                </PublicLayout>
                    
            </Suspense>
        ),
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={<LoadingSpinner/>}>   
                <PublicLayout>
                    <PrivateRoute requestGuest={true}>
                        <Login />
                    </PrivateRoute>
                </PublicLayout>
            </Suspense>
        )
    }
]