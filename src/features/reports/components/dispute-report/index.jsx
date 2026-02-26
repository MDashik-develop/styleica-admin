import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Table from "../../../../components/reusable/table";

const DisputesReport = () => {
    const stats = [
        { label: "Open Disputes", value: 25 },
        { label: "Resolved Disputes", value: 62 },
        { label: "Escalated Disputes", value: 8 },
    ];

    const monthlyData = [
        { month: "Jan", disputes: 5 },
        { month: "Feb", disputes: 10 },
        { month: "Mar", disputes: 8 },
        { month: "Apr", disputes: 12 },
        { month: "May", disputes: 7 },
        { month: "Jun", disputes: 11 },
    ];

    const headers = [
        { title: "Dispute ID", dataIndex: "id", key: "id" },
        { title: "Order ID", dataIndex: "order", key: "order" },
        { title: "Customer", dataIndex: "customer", key: "customer" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Date", dataIndex: "date", key: "date" },
    ];

    const data = [
        { key: 1, id: "#DIS-1001", order: "#ORD-1003", customer: "John Doe", status: "Open", date: "2025-10-03" },
        { key: 2, id: "#DIS-1002", order: "#ORD-1007", customer: "Sarah Smith", status: "Resolved", date: "2025-10-06" },
        { key: 3, id: "#DIS-1003", order: "#ORD-1010", customer: "David Lee", status: "Escalated", date: "2025-10-09" },
    ];

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((s, i) => (
                    <div key={i} className="card p-4 text-center">
                        <h3 className="text-sm text-slate-500">{s.label}</h3>
                        <p className="text-2xl font-bold text-slate-700 mt-1">{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="card p-4">
                <h3 className="font-semibold mb-2">Monthly Disputes</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="disputes" stroke="#f43f5e" fill="#fca5a5" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="card p-4">
                <h3 className="font-semibold mb-3">Recent Disputes</h3>
                <Table headers={headers} data={data} enableFilters={false} enableSelection={false} />
            </div>
        </div>
    );
};

export default DisputesReport;
