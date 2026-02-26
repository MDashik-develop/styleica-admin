import React, { useState } from "react";
import FormInput from "../../../../../components/reusable/form-input";
import { useGetAllUsers } from "../../../../users/services/usersApi";


const OrderFilter = ({ setOrderFilters, setCurrentPage }) => {

    const { data, isLoading } = useGetAllUsers();
    const [formData, setFormData] = useState({
        assign_by: null,
        created_by: null,
        print_status: null,
        sort_asc: false,
        start_date: null,
        end_date: null,
    });


    // submit fn
    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);

        setOrderFilters({
            assigned_by: formData.assign_by || null,
            created_by: formData.created_by || null,
            print_status: formData.print_status || null,
            sort_asc: formData.sort_asc || false,
            start_date: formData.start_date
                ? formData.start_date.format("YYYY-MM-DD")
                : null,
            end_date: formData.end_date
                ? formData.end_date.format("YYYY-MM-DD")
                : null,
        });
    };

    // clear fn
    const handleClear = () => {
        setCurrentPage(1);
        setFormData({
            assign_by: null,
            created_by: null,
            print_status: null,
            sort_asc: false,
            start_date: null,
            end_date: null,
        });
        setOrderFilters({});
    };

    const userOptions = data?.data?.map(user => ({
        label: user.name,
        value: user.id,
    })) || [];


    return (
        <>
            {
                isLoading ?
                    <div></div>
                    :
                    <form onSubmit={handleSubmit} className="card !pt-2 w-full flex flex-col lg:flex-row gap-5">
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-5">

                            <FormInput
                                label="Assigned By"
                                type="select"
                                value={formData.assign_by}
                                onChange={(value) =>
                                    setFormData(prev => ({ ...prev, assign_by: value }))
                                }
                                options={userOptions}
                                placeholder="Select User"
                            />

                            <FormInput
                                label="Order Created By"
                                type="select"
                                value={formData.created_by}
                                onChange={(value) =>
                                    setFormData(prev => ({ ...prev, created_by: value }))
                                }
                                options={userOptions}
                                placeholder="Select User"
                            />

                            <FormInput
                                label="Print Status"
                                type="select"
                                value={formData.print_status}
                                onChange={(value) =>
                                    setFormData(prev => ({ ...prev, print_status: value }))
                                }
                                options={[{ label: "Printed", value: true }, { label: "Un-Printed", value: false }]}
                                placeholder="Select Print Status"
                            />

                            <FormInput
                                label="Sort Order"
                                type="select"
                                value={formData.sort_asc}
                                onChange={(value) =>
                                    setFormData(prev => ({ ...prev, sort_asc: value }))
                                }
                                options={[
                                    { label: "Old", value: true },
                                    { label: "Latest", value: false },
                                ]}
                                placeholder="Select Sort"
                            />

                            <FormInput
                                label="Start Date"
                                type="date"
                                value={formData.start_date}
                                onChange={(date) =>
                                    setFormData(prev => ({ ...prev, start_date: date }))
                                }
                            />

                            <FormInput
                                label="End Date"
                                type="date"
                                value={formData.end_date}
                                onChange={(date) =>
                                    setFormData(prev => ({ ...prev, end_date: date }))
                                }
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-5">
                            <button type="submit" className="button">
                                Filter
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="button !bg-red-600"
                            >
                                Clear
                            </button>
                        </div>
                    </form>
            }
        </>
    );
};

export default OrderFilter;
