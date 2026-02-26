import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const PublicRoute = ({ children }) => {
    const token = Cookies.get("u_token");

    // If logged in, block all public pages (login/signup)
    if (token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PublicRoute;
