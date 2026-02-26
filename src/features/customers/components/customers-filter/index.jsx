import React, { useState } from "react";
import FormInput from "../../../../components/reusable/form-input";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);


const CustomersFilter = ({ queryParams, setQueryParams, setCurrentPage }) => {

    const [formState, setFormState] = useState({
        mobile: null,
        customer_type: null,
        start_date: null,
        end_date: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        setCurrentPage(1);

        setQueryParams({
            mobile: formState.mobile || null,
            customer_type: formState.customer_type || null,
            start_date: formState.start_date
                ? formState.start_date.utc().format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ")
                : null,
            end_date: formState.end_date
                ? formState.end_date.utc().format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ")
                : null,
        });
    };

    const handleClear = () => {
        setCurrentPage(1);

        setFormState({
            mobile: null,
            customer_type: null,
            start_date: null,
            end_date: null,
        });
        setQueryParams({});
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="card !pt-2 w-full flex flex-col lg:flex-row gap-5 mt-6 mb-8"
        >
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-5">

                {/* MOBILE */}
                <FormInput
                    label="Search by Mobile"
                    value={formState.mobile}
                    onChange={(e) =>
                        setFormState(prev => ({ ...prev, mobile: e.target.value }))
                    }
                    placeholder="Type mobile number"
                />

                {/* TYPE */}
                <FormInput
                    label="Customer Type"
                    type="select"
                    value={formState.customer_type}
                    onChange={(value) =>
                        setFormState(prev => ({ ...prev, customer_type: value }))
                    }
                    options={[
                        { label: "All", value: "" },
                        { label: "Good", value: "Good" },
                        { label: "Excellent", value: "Excellent" },
                        { label: "Risky", value: "Risky" },
                        { label: "Fraud", value: "Fraud" },
                    ]}
                    placeholder="Select Type"
                />

                {/* START DATE */}
                <FormInput
                    label="Start Date"
                    type="datepicker"
                    value={formState.start_date}
                    onChange={(date) => setFormState(prev => ({ ...prev, start_date: date }))}
                />

                {/* END DATE */}
                <FormInput
                    label="End Date"
                    type="datepicker"
                    value={formState.end_date}
                    onChange={(date) => setFormState(prev => ({ ...prev, end_date: date }))}
                />
            </div>

            <div className="flex items-center gap-2 pt-3">
                <button type="submit" className="button">
                    Filter
                </button>
                <button type="button" onClick={handleClear} className="button !bg-red-600">
                    Clear
                </button>
            </div>
        </form>
    );
};

export default CustomersFilter;
