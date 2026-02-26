import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import Table from "../../../../components/reusable/table";
import SmsForm from "../../components/sms-form";
import SmsFilter from "../../components/filter";


const Sms = () => {

    const [filters, setFilters] = useState({
        number: "",
        status: "",
    });

    const summary = [
        { label: "Total Sent", value: 320 },
        { label: "Delivered", value: 290 },
        { label: "Failed", value: 30 },
        { label: "Today Sent", value: 52 },
    ];

    const columns = [
        { title: "ID", dataIndex: "id" },
        { title: "Phone Number", dataIndex: "number" },
        { title: "Message", dataIndex: "message" },
        { title: "Status", dataIndex: "status" },
        { title: "Time", dataIndex: "time" },
    ];

    const tableData = [
        {
            id: 1,
            number: "+8801787654321",
            message: "Hello! Your parcel is on the way.",
            status: "Delivered",
            time: "2025-02-08 10:12 AM",
        },
        {
            id: 2,
            number: "+8801999001122",
            message: "Your OTP is 5567.",
            status: "Failed",
            time: "2025-02-08 10:20 AM",
        },
    ];

    // Apply filters
    const filteredData = tableData.filter((item) => {
        const matchNumber = filters.number
            ? item.number.includes(filters.number)
            : true;
        const matchStatus = filters.status
            ? item.status === filters.status
            : true;
        return matchNumber && matchStatus;
    });

    return (
        <div className="space-y-6">

            <h2 className="title !pb-0">Bulk SMS</h2>

            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {summary.map((item, i) => (
                    <div key={i} className="card p-4 text-center">
                        <h3 className="text-sm text-gray-500">{item.label}</h3>
                        <p className="text-xl font-semibold mt-1">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Form */}
            <SmsForm />

            {/* Filter */}
            <SmsFilter filters={filters} setFilters={setFilters} />

            {/* SMS Logs Table */}
            <Table
                headers={columns}
                data={filteredData}
                enableSelection={false}
            />

        </div>
    );
};

export default Sms;
