import React from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Table from "../../../../components/reusable/table";

const OrderReport = () => {
    const stats = [
        { label: "Total Orders", value: 8560 },
        { label: "Delivered", value: 7260 },
        { label: "Pending", value: 412 },
        { label: "Cancelled", value: 340 },
    ];

    const monthlyData = [
        { month: "Jan", orders: 800, revenue: 12000 },
        { month: "Feb", orders: 1100, revenue: 17500 },
        { month: "Mar", orders: 900, revenue: 14000 },
        { month: "Apr", orders: 1500, revenue: 22000 },
        { month: "May", orders: 1700, revenue: 25000 },
        { month: "Jun", orders: 1800, revenue: 27000 },
    ];

    const headers = [
        { title: "Order ID", dataIndex: "id", key: "id" },
        { title: "Customer", dataIndex: "customer", key: "customer" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Total", dataIndex: "total", key: "total" },
        { title: "Date", dataIndex: "date", key: "date" },
    ];

    const data = [
        { key: 1, id: "#ORD-1001", customer: "John Doe", status: "Delivered", total: "$120", date: "2025-10-01" },
        { key: 2, id: "#ORD-1002", customer: "Sarah Smith", status: "Pending", total: "$80", date: "2025-10-03" },
        { key: 3, id: "#ORD-1003", customer: "David Lee", status: "Cancelled", total: "$60", date: "2025-10-05" },
        { key: 4, id: "#ORD-1004", customer: "Emma Johnson", status: "Delivered", total: "$200", date: "2025-10-06" },
        { key: 5, id: "#ORD-1005", customer: "Michael Brown", status: "Delivered", total: "$150", date: "2025-10-08" },
    ];

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((item, idx) => (
                    <div key={idx} className="card p-4 text-center">
                        <h3 className="text-sm text-slate-500">{item.label}</h3>
                        <p className="text-2xl font-bold text-slate-700 mt-1">{item.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-4">
                    <h3 className="font-semibold mb-2">Orders by Month</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card p-4">
                    <h3 className="font-semibold mb-2">Revenue Trend</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="card p-4">
                <h3 className="font-semibold mb-3">Recent Orders</h3>
                <Table headers={headers} data={data} enableFilters={false} enableSelection={false} />
            </div>
        </div>
    );
};

export default OrderReport;
