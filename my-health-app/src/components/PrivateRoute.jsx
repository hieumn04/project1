import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore"
import PropTypes from "prop-types";





export const PrivateRoute = ({
    children,
    allowedRoles = [],
    requestGuest = false,
}) => {
    const {user} = useAuthStore();

    if(requestGuest) {
        return user ? (
            <Navigate to="/home" replace={true} />
        ) : (
            children
        );
    }

    if(!user) {
        return <Navigate to={"/login"} replace={true} />;
    }

    if(allowedRoles.length && !allowedRoles.includes(user.role)) {
        return <Navigate to={"/unauthorized"} replace={true} />;

    }
    return children;
};

const getRoleBasePath = (role) => {
    switch(role) {
        case "manager":
            return "/manager/users";
        case "psychologist":
            return "/psychologist-profile";
        case "student":
            return "/student-profile";
        case "parent": 
            return "/parent-profile";    
        default:
            return "/home";
    }
}

PrivateRoute.propTypes = {
    children : PropTypes.node.isRequired,
    allowedRoles : PropTypes.array,
    requestGuest : PropTypes.bool,

}