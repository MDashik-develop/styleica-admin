import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthInputs = ({
    type = "text",
    label = "",
    name,
    value,
    onChange,
}) => {
    const [show, setShow] = useState(false);
    const inputType = type === "password" && show ? "text" : type;

    const baseInput =
        "w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-sm outline-none transition-all focus:border-[#007575]";
    const baseLabel =
        "absolute left-3 text-gray-500 text-sm bg-white px-1 transition-all duration-200 ease-in-out pointer-events-none";

    return (
        <div className="relative w-full">
            <input
                type={inputType}
                name={name}
                value={value}
                onChange={onChange}
                required
                className={baseInput}
            />
            <label htmlFor={name} className={baseLabel}>
                {label}
            </label>

            {/* password toggle */}
            {type === "password" && (
                <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShow(!show)}
                >
                    {show ? <FaEyeSlash /> : <FaEye />}
                </span>
            )}

            <style>
                {`
          input:focus + label,
          input:valid + label {
            top: 0;
            transform: translateY(-50%);
            font-size: 12px;
            color: #007575;
          }
          input + label {
            top: 50%;
            transform: translateY(-50%);
          }
        `}
            </style>
        </div>
    );
};

export default AuthInputs;
