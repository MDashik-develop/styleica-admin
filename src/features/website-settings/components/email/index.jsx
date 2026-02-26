import React from "react";
import FormInput from "../../../../components/reusable/form-input";


const EmailSettings = () => {
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="SMTP Host" placeholder="smtp.mail.com" />
                <FormInput label="SMTP Port" placeholder="587" />
            </div>


            <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="Email Username" placeholder="admin@mail.com" />
                <FormInput label="Email Password" type="password" placeholder="********" />
            </div>


            <button className="button mt-4">Save Email Settings</button>
        </div>
    );
};

export default EmailSettings;