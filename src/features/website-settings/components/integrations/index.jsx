import React from "react";
import FormInput from "../../../../components/reusable/form-input";


const IntegrationsSettings = () => {
    return (
        <div className="space-y-6">
            <FormInput label="Google Analytics ID" placeholder="G-XXXXXXXX" />
            <FormInput label="Facebook Pixel ID" placeholder="1234567890" />
            <button className="button mt-4">Save Integrations</button>
        </div>
    );
};

export default IntegrationsSettings;