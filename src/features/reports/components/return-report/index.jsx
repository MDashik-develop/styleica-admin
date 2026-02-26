import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Table from "../../../../components/reusable/table";

const ReturnsReport = () => {
    const stats = [
        { label: "Total Returns", value: 220 },
        { label: "Approved", value: 90 },
        { label: "Pending", value: 45 },
        { label: "Rejected", value: 55 },
    ];

    const monthlyData = [
        { month: "Jan", returns: 20 },
        { month: "Feb", returns: 35 },
        { month: "Mar", returns: 30 },
        { month: "Apr", returns: 50 },
        { month: "May", returns: 40 },
        { month: "Jun", returns: 45 },
    ];

    const headers = [
        { title: "Return ID", dataIndex: "id", key: "id" },
        { title: "Order ID", dataIndex: "order", key: "order" },
        { title: "Customer", dataIndex: "customer", key: "customer" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Date", dataIndex: "date", key: "date" },
    ];

    const data = [
        { key: 1, id: "#RET-1001", order: "#ORD-1001", customer: "John Doe", status: "Approved", date: "2025-10-01" },
        { key: 2, id: "#RET-1002", order: "#ORD-1002", customer: "Sarah Smith", status: "Pending", date: "2025-10-03" },
        { key: 3, id: "#RET-1003", order: "#ORD-1003", customer: "David Lee", status: "Rejected", date: "2025-10-05" },
    ];

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <div key={i} className="card p-4 text-center">
                        <h3 className="text-sm text-slate-500">{s.label}</h3>
                        <p className="text-2xl font-bold text-slate-700 mt-1">{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="card p-4">
                <h3 className="font-semibold mb-2">Monthly Returns</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="returns" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="card p-4">
                <h3 className="font-semibold mb-3">Recent Returns</h3>
                <Table headers={headers} data={data} enableFilters={false} enableSelection={false} />
            </div>
        </div>
    );
};

export default ReturnsReport;
