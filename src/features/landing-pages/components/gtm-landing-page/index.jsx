import React, { useState, useEffect } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import toast from "react-hot-toast";
import FormInput from "../../../../components/reusable/form-input";
import { SubmitButton } from "../../../../components/reusable/ui/action-btns";
import { IoMdCheckmark } from "react-icons/io";
// import { useGetSettings, useUpdateSettings } from "../services/settingsApi"; // Assuming you have these

const GTMLadingPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [gtmValue, setGtmValue] = useState("");
    const [loading, setLoading] = useState(false);

    // Mock data simulation - Replace with your actual API query
    useEffect(() => {
        // Example: setGtmValue(data?.central_gtm_key || "");
        setGtmValue("GTM-XXXXXXX");
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // await updateSettings({ central_gtm_key: gtmValue });
            toast.success("Central GTM Key updated successfully!");
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to update GTM Key");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card max-w-md relative">

            <div className="flex justify-between items-center pb-3">
                <h2 className="font-semibold text-lg">GTM Configuration</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm transition-all ${gtmValue ? "bg-blue-50 text-blue-600" : "bg-primary text-white"
                            }`}
                    >
                        {gtmValue ? <><FaEdit /> Edit</> : <><FaPlus /> Add</>}
                    </button>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleSave} className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex items-end gap-3">
                        <div className="flex-1">
                            <FormInput
                                label="Google Tag Manager ID"
                                placeholder="e.g. GTM-W23456"
                                value={gtmValue}
                                onChange={(e) => setGtmValue(e.target.value)}
                                Required
                            />
                        </div>
                        <div className="flex gap-2 pb-1">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className=" px-4 flex items-center gap-2 bg-red-500 text-light text-sm"
                            >
                                <IoCloseCircle size={18} />
                            </button>
                            <SubmitButton
                                btnText="Save"
                                loading={loading}
                                className="h-10 px-6 flex items-center gap-2"
                            />
                        </div>
                    </div>
                </form>
            ) : (
                <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-200 flex items-center justify-between">
                    <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Current Active Key</span>
                        <code className="text-lg font-mono font-bold text-primary">
                            {gtmValue || "Not Configured"}
                        </code>
                    </div>
                    {gtmValue && (
                        <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                            <IoMdCheckmark /> Active centrally
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GTMLadingPage;