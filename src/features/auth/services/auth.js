import { useMutation } from "@tanstack/react-query";
import { axiosPublic } from "../../../config/axiosConfig";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../redux/features/userSlice";
import { clearOrderFilters } from "../../../redux/features/ordersSlice";


/* API */
const loginApi = async (payload) => {
    const res = await axiosPublic.post("/login", payload);
    return res.data;
};

/* Hooks */
export const useLogin = () =>
    useMutation({
        mutationFn: loginApi,
    });

export const useLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const logout = () => {
        Cookies.remove("u_token");
        dispatch(clearUser());
        dispatch(clearOrderFilters());
        navigate("/login");
    };

    return logout;
};


