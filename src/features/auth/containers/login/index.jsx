import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import AuthInputs from "../../components/inputs";
import { siteConfig } from "../../../../config/siteConfig";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../services/auth";
import Cookies from "js-cookie";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { fetchUser } from "../../../../redux/features/userSlice";


const Login = () => {

    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const loginMutation = useLogin();

    const loading = loginMutation.isLoading || loginMutation.isPending;

    // input change fn 
    const handleChange = (e) => {
        setErrorMessage("");
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // login fn
    const handleLogin = (e) => {

        e.preventDefault();
        loginMutation.mutate(form, {
            onSuccess: async (res) => {
                Cookies.set("u_token", res?.token, {
                    secure: true,
                    sameSite: "Strict",
                });

                await dispatch(fetchUser());
                navigate("/", { replace: true });
            },
            onError: (err) => setErrorMessage(err.response?.data?.message || "Login failed"),
        });
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-md rounded-lg w-[380px] px-8 py-10 text-center">
                <h1 className="text-3xl font-semibold text-[#004d4d] tracking-[0.3em] mb-8 uppercase">
                    {siteConfig.companyName}
                </h1>

                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <AuthInputs
                        type="email"
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <AuthInputs
                        type="password"
                        label="Password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    {/* <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="accent-[#007575]" />
                            <span>Remember</span>
                        </label>
                        <Link to={"/forgot-password"} className="text-[#007575] hover:underline">
                            Forgot Password?
                        </Link>
                    </div> */}

                    {errorMessage && <p className="text-red-600 text-center font-semibold">{errorMessage}</p>}


                    <button
                        type="submit"
                        className="bg-[#007575] text-white rounded-md py-2 font-semibold hover:bg-[#006666] transition-all disabled:!opacity-70 disabled:!cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading && <Spin indicator={<LoadingOutlined spin />} size="small" className="!text-light !pr-2 !mb-1" />}
                        {loading ? "Please Wait" : "Login"}
                    </button>
                </form>

                {/* <p className="text-center text-sm mt-5 text-gray-600">
                    New to {siteConfig.companyName}?{" "}
                    <Link to={"/signup"} className="text-[#007575] font-medium hover:underline">
                        Sign Up
                    </Link>
                </p>

                <div className="flex items-center justify-center gap-2 my-4">
                    <div className="w-20 h-[1px] bg-gray-300"></div>
                    <span className="text-gray-400 text-sm">Or</span>
                    <div className="w-20 h-[1px] bg-gray-300"></div>
                </div>

                <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition">
                    <FcGoogle className="text-xl" />
                    <span className="text-gray-700 text-sm font-medium">
                        Continue with Google
                    </span>
                </button> */}
            </div>
        </div>
    );
};

export default Login;
