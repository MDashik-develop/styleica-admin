import React from "react";
import FormInput from "../../../../components/reusable/form-input";


const GeneralSettins = () => {

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="Website Name" placeholder="Enter website name" required />
                <FormInput label="Contact Email" placeholder="support@example.com" required />
            </div>


            <div className="grid md:grid-cols-2 gap-6">
                <FormInput label="Business Phone" placeholder="+8801XXXXXXXXX" />
                <FormInput label="Timezone" placeholder="GMT +6" />
            </div>


            <button className="button mt-4">Save Changes</button>
        </div>
    );
};

export default GeneralSettins;