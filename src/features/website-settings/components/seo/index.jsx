import React from "react";
import FormInput from "../../../../components/reusable/form-input";


const SeoSettings = () => {
    return (
        <div className="space-y-6">
            <FormInput label="Meta Title" placeholder="Enter website meta title" />
            <FormInput label="Meta Description" placeholder="Enter meta description" />
            <FormInput label="Keywords" placeholder="keyword1, keyword2, keyword3" />
            <button className="button mt-4">Save SEO Settings</button>
        </div>
    );
};

export default SeoSettings;