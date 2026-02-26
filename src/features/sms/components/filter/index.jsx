import React from "react";
import { FiFilter } from "react-icons/fi";
import FormInput from "../../../../components/reusable/form-input";


const SmsFilter = ({ filters, setFilters }) => {

    const handleChange = (name, value) => {
        setFilters({ ...filters, [name]: value });
    };

    return (
        <div className="card p-4 space-y-4">

            <form className="flex items-center gap-4">

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Phone Number"
                        placeholder="Search by number"
                        name="number"
                        value={filters.number}
                        onChange={(e) => handleChange("number", e.target.value)}
                    />

                    <FormInput
                        label="Status"
                        type="select"
                        name="status"
                        value={filters.status}
                        onChange={(e) =>
                            handleChange("status", e.target.value)
                        }
                        options={[
                            { label: "All", value: "" },
                            { label: "Delivered", value: "Delivered" },
                            { label: "Failed", value: "Failed" },
                        ]}
                    />
                </div>
                <button type="submit" className="button mt-auto">
                    Filter
                </button>
            </form>
        </div>
    );
};

export default SmsFilter;
