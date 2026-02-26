import React from "react";
import { MdArrowOutward } from "react-icons/md";
import Table from "../../../../components/reusable/table";
import { Link } from "react-router-dom";
import { FaListCheck } from "react-icons/fa6";

const headers = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Date", dataIndex: "date", key: "date" },
];

const data = [
    {
        key: 1,
        orderId: "#ORD-4571",
        customer: "Nusrat Jahan",
        amount: "৳850",
        status: "Delivered",
        date: "Nov 04, 2025",
    },
    {
        key: 2,
        orderId: "#ORD-4568",
        customer: "Sabbir Rahman",
        amount: "৳1,200",
        status: "Processing",
        date: "Nov 03, 2025",
    },
    {
        key: 3,
        orderId: "#ORD-4560",
        customer: "Avi Deb",
        amount: "৳499",
        status: "Pending",
        date: "Nov 02, 2025",
    },
    {
        key: 4,
        orderId: "#ORD-4558",
        customer: "Tahsin Khan",
        amount: "৳1,420",
        status: "Cancelled",
        date: "Nov 01, 2025",
    },
];

const customRender = {
    status: (status) => {
        const color =
            status === "Delivered"
                ? "bg-green-100 text-green-700"
                : status === "Processing"
                    ? "bg-indigo-100 text-indigo-700"
                    : status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-rose-100 text-rose-700";

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
                {status}
            </span>
        );
    },
};

const RecentOrders = () => (

    <div className="bg-light p-5 shadow border border-slate-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
                <FaListCheck className="text-lg text-cyan-700" />
                <h3 className="font-semibold text-gray-800 text-base">
                    Recent Orders
                </h3>
            </div>
            <Link
                to="#"
                className="flex items-center gap-1 text-indigo-600 text-sm hover:text-indigo-800"
            >
                View All
                <MdArrowOutward size={16} />
            </Link>
        </div>

        {/* Table */}
        <Table
            headers={headers}
            data={data}
            pagination={false}
            enableFilters={false}
            enableSelection={false}
            customRender={customRender}
        />
    </div>
);

export default RecentOrders;
