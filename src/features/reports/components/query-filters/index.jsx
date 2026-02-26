import React from "react";
import FormInput from "../../../../components/reusable/form-input";


const QueryFilters = () => {

    return (
        <form className="card !pt-2 w-full flex items-end gap-5 mb-6">
            <div className="flex-1 grid grid-cols-2 gap-5">
                <FormInput
                    label="Start Date"
                    name="startDate"
                    type="date"
                />
                <FormInput
                    label="End Date"
                    name="endDate"
                    type="date"
                />
            </div>
            <button type="submit" className="button">
                Filter
            </button>
        </form>
    );
};

export default QueryFilters;