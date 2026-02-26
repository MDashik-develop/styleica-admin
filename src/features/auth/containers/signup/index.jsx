import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import AuthInputs from "../../components/inputs";
import { siteConfig } from "../../../../config/siteConfig";
import { Link } from "react-router-dom";


const SignUp = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div
            className="w-screen h-screen flex items-center justify-center bg-gray-50"
            style={{ fontFamily: "sans-serif" }}
        >
            <div className="bg-light shadow-md rounded-lg w-[380px] px-8 py-10 text-center">
                {/* Logo / Header */}
                <h1 className="text-3xl font-semibold text-[#004d4d] tracking-[0.3em] mb-8 uppercase">
                    {siteConfig.companyName}
                </h1>

                {/* Form */}
                <form className="flex flex-col gap-4">
                    <AuthInputs
                        type="text"
                        label="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <AuthInputs
                        type="email"
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <AuthInputs
                        type="tel"
                        label="Phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                    <AuthInputs
                        type="password"
                        label="Password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        className="bg-[#007575] text-white rounded-md py-2 font-semibold hover:bg-[#006666] transition-all"
                    >
                        Sign Up
                    </button>
                </form>

                {/* login */}
                <p className="text-center text-sm mt-5 text-gray-600">
                    Have an account?{" "}
                    <Link to={"/login"} className="text-[#007575] font-medium hover:underline">
                        Login
                    </Link>
                </p>

                {/* Divider */}
                <div className="flex items-center justify-center gap-2 my-4">
                    <div className="w-20 h-[1px] bg-gray-300"></div>
                    <span className="text-gray-400 text-sm">Or</span>
                    <div className="w-20 h-[1px] bg-gray-300"></div>
                </div>

                {/* Google Button */}
                <button className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition">
                    <FcGoogle className="text-xl" />
                    <span className="text-gray-700 text-sm font-medium">
                        Continue with Google
                    </span>
                </button>
            </div>
        </div>
    );
};

export default SignUp;
