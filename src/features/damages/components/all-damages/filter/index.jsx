import React from "react";
import FormInput from "../../../../../components/reusable/form-input";


const DamageFilter = ({ filters, setFilters }) => {


    const handleChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid md:grid-cols-3 gap-4">
            <FormInput
                type="date"
                label="Date"
                value={filters.date}
                onChange={(e) => handleChange("date", e.target.value)}
            />

            <FormInput
                label="Search"
                placeholder="Search product or lot"
                value={filters.search}
                onChange={(e) => handleChange("search", e.target.value)}
            />

            <FormInput
                type="select"
                label="Category"
                value={filters.category}
                options={[
                    { label: "All", value: "" },
                    { label: "Electronics", value: "electronics" },
                    { label: "Home Appliances", value: "home" },
                    { label: "Fashion", value: "fashion" },
                ]}
                onChange={(e) => handleChange("category", e)}
            />
        </div>
    );
};

export default DamageFilter;
