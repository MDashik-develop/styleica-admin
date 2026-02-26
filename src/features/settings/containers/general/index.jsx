import React, { useState } from "react";
import FormInput from "../../../../components/reusable/form-input";
import Media from "../../../../components/reusable/media";


const General = () => {

    const [formData, setFormData] = useState({
        businessName: "Genters",
        adminName: "Avi Deb",
        email: "admin@genters.com",
        phone: "+8801712345678",
        address: "123, Main Street, Dhaka, Bangladesh",
        timezone: "GMT+6",
        currency: "BDT",
        taxRate: 15,
        defaultShipping: "Standard",
        returnPolicy: "30 days return policy",
    });

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("General Settings Data:", formData);
        // API call to save settings
    };

    return (

        <div>

            <h3 className="title">General Settings</h3>

            <form
                className="card"
                onSubmit={handleSubmit}
            >


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Business Name"
                        name="businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => handleChange("businessName", e.target.value)}
                        placeholder="Enter business name"
                        Required
                    />

                    <FormInput
                        label="Admin Name"
                        name="adminName"
                        type="text"
                        value={formData.adminName}
                        onChange={(e) => handleChange("adminName", e.target.value)}
                        placeholder="Enter admin name"
                        Required
                    />

                    <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Enter admin email"
                        Required
                    />

                    <FormInput
                        label="Phone"
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="Enter contact number"
                        Required
                    />

                    <FormInput
                        label="Address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        placeholder="Enter office address"
                        Required
                    />

                    <FormInput
                        label="Timezone"
                        name="timezone"
                        type="text"
                        value={formData.timezone}
                        onChange={(e) => handleChange("timezone", e.target.value)}
                        placeholder="Enter timezone (e.g., GMT+6)"
                        Required
                    />

                    <FormInput
                        label="Default Currency"
                        name="currency"
                        type="text"
                        value={formData.currency}
                        onChange={(e) => handleChange("currency", e.target.value)}
                        placeholder="Enter currency (e.g., BDT, USD)"
                        Required
                    />

                    <FormInput
                        label="Tax Rate (%)"
                        name="taxRate"
                        type="number"
                        value={formData.taxRate}
                        onChange={(e) => handleChange("taxRate", e.target.value)}
                        placeholder="Enter tax rate"
                        Required
                    />

                    <FormInput
                        label="Default Shipping Method"
                        name="defaultShipping"
                        type="text"
                        value={formData.defaultShipping}
                        onChange={(e) => handleChange("defaultShipping", e.target.value)}
                        placeholder="Enter default shipping method"
                        Required
                    />

                    <FormInput
                        label="Return Policy"
                        name="returnPolicy"
                        type="text"
                        value={formData.returnPolicy}
                        onChange={(e) => handleChange("returnPolicy", e.target.value)}
                        placeholder="Enter return policy"
                        Required
                    />
                </div>

                <div className="pt-4 flex items-center gap-4">
                    <label className="font-semibold text-dark">Upload Logo / Media:</label>
                    <Media />
                </div>

                <button
                    type="submit"
                    className="button w-full md:w-auto mt-4 mx-auto"
                >
                    Save Settings
                </button>
            </form>

        </div>
    );
};

export default General;
