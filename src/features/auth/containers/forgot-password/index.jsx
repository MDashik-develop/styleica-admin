import React, { useState } from "react";
import { Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthInputs from "../../components/inputs";
import { siteConfig } from "../../../../config/siteConfig";

const ForgotPassword = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const steps = [
        {
            title: "Enter Email",
            content: (
                <AuthInputs
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            ),
        },
        {
            title: "Verify Code",
            content: (
                <AuthInputs
                    type="text"
                    label="Verification Code"
                    name="code"
                    placeholder="Enter code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            ),
        },
        {
            title: "Set New Password",
            content: (
                <>
                    <AuthInputs
                        type="password"
                        label="New Password"
                        name="newPassword"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <AuthInputs
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </>
            ),
        },
    ];

    const next = () => {
        if (currentStep === 0) {
            if (!email) {
                message.error("Email is required!");
                return;
            }
            setCurrentStep(1);
        } else if (currentStep === 1) {
            if (code === "2222") {
                message.success("Verification successful!");
                setCurrentStep(2);
            } else {
                message.error("Invalid code");
            }
        } else if (currentStep === 2) {
            if (!newPassword || !confirmPassword) {
                message.error("Please fill both password fields!");
                return;
            }
            if (newPassword !== confirmPassword) {
                message.error("Passwords do not match!");
                return;
            }
            message.success("Password changed successfully!");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
    };

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div
            className="w-screen h-screen flex items-center justify-center bg-gray-50"
            style={{ fontFamily: "sans-serif" }}
        >
            <div className="bg-white shadow-md rounded-lg w-[380px] px-8 py-10 text-center">
                {/* Header */}
                <h1 className="text-3xl font-semibold text-[#004d4d] tracking-[0.3em] mb-8 uppercase">
                    {siteConfig.companyName}
                </h1>

                {/* Steps content */}
                <div className="mb-5 space-y-4">{steps[currentStep].content}</div>

                {/* Buttons */}
                <div className="flex justify-between">
                    {currentStep > 0 ? (
                        <Button
                            onClick={prev}
                            className="bg-gray-200 text-gray-700 hover:bg-gray-300 border-none"
                        >
                            Back
                        </Button>
                    ) : <div></div>}
                    <Button
                        type="primary"
                        onClick={next}
                        className="bg-[#007575] border-none hover:bg-[#006666]"
                    >
                        {currentStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                </div>

                {/* Back to Login */}
                <p className="text-center text-sm mt-5 text-gray-600">
                    Remembered your password?{" "}
                    <Link to={"/login"}
                        className="text-[#007575] font-medium hover:underline ml-1"
                    >
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
