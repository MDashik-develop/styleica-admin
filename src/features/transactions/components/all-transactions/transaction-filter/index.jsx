import React from "react";
import FormInput from "../../../../../components/reusable/form-input";


const TransactionFilter = () => {


    return (
        <form className="card !pt-2 w-full flex flex-col lg:flex-row lg:items-end gap-5 mt-2 mb-8">

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5">

                {/* Type */}
                <FormInput
                    label="Customer Type"
                    name="type"
                    type="select"
                    options={[
                        { label: "All", value: "all" },
                        { label: "Curier", value: "curier" },
                        { label: "Vendor", value: "vendor" },
                        { label: "Customer", value: "customer" },
                    ]}
                />

                {/* Joined Date Range */}
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

export default TransactionFilter;
