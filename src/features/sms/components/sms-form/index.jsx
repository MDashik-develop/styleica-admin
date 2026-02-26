import React, { useState } from "react";
import { FiSend, FiPhone, FiMessageSquare } from "react-icons/fi";
import FormInput from "../../../../components/reusable/form-input";


const SmsForm = () => {

    const [formData, setFormData] = useState({
        numbers: "",
        message: "",
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSend = () => {
        console.log("Sending SMS:", formData);
    };

    return (
        <div className="card p-5 space-y-5">
            <h3 className="text-lg font-semibold mb-2">Send Bulk SMS</h3>

            <div className="grid md:grid-cols-2 gap-4">
                <FormInput
                    label={
                        <span className="flex items-center gap-2">
                            <FiPhone /> Phone Numbers (Comma Seperated)
                        </span>
                    }
                    placeholder="017xxxx, 018xxxx, 019xxxx..."
                    name="numbers"
                    type="textarea"
                    rows={5}
                    value={formData.numbers}
                    onChange={(e) => handleChange("numbers", e.target.value)}
                    extra="Comma separated phone numbers"
                    Required
                />

                <FormInput
                    label={
                        <span className="flex items-center gap-2">
                            <FiMessageSquare /> Message
                        </span>
                    }
                    placeholder="Write SMS…"
                    name="message"
                    type="textarea"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    extra="Max 160 characters"
                    Required
                />
            </div>

            <button
                onClick={handleSend}
                className="button bg-blue-600 text-white flex items-center gap-2"
            >
                <FiSend /> Send SMS
            </button>
        </div>
    );
};

export default SmsForm;
