import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Loading from "../features/public/loading";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../redux/features/userSlice";
import Cookies from "js-cookie";


const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { user, loading, isAuthChecked } = useSelector(
        (state) => state.user
    );

    const token = Cookies.get("u_token");

    useEffect(() => {
        if (token && !isAuthChecked) {
            dispatch(fetchUser());
        }
    }, [dispatch, token, isAuthChecked]);

    // ⛔ NO TOKEN → redirect immediately (NO loading)
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // ⏳ Token exists → wait for auth check
    if (loading || !isAuthChecked) {
        return <Loading />;
    }

    // ❌ Token exists but invalid / expired
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};



PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
