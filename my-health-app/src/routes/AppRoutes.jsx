
import { Suspense } from "react";
import StandardLayout from "../layouts/StandardLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import { Route } from "react-router-dom";




export const routes = [
    {
        path : '/',
        element: (
            <Suspense fallback={<LoadingSpinner/>}>
                
                    <StandardLayout/>
            
            

            </Suspense>

        )

    }
]