import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Table from "../../../../components/reusable/table";

const RefundsReport = () => {
    const stats = [
        { label: "Pending Refunds", value: 42 },
        { label: "Processed Refunds", value: 110 },
        { label: "Failed Refunds", value: 28 },
    ];

    const COLORS = ["#f59e0b", "#10b981", "#ef4444"];

    const headers = [
        { title: "Refund ID", dataIndex: "id", key: "id" },
        { title: "Order ID", dataIndex: "order", key: "order" },
        { title: "Customer", dataIndex: "customer", key: "customer" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Amount", dataIndex: "amount", key: "amount" },
    ];

    const data = [
        { key: 1, id: "#REF-1001", order: "#ORD-1001", customer: "John Doe", status: "Processed", amount: "$120" },
        { key: 2, id: "#REF-1002", order: "#ORD-1002", customer: "Sarah Smith", status: "Pending", amount: "$80" },
        { key: 3, id: "#REF-1003", order: "#ORD-1003", customer: "David Lee", status: "Failed", amount: "$60" },
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
                <h3 className="font-semibold mb-2">Refund Breakdown</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={stats} dataKey="value" nameKey="label" outerRadius={80} label>
                            {stats.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="card p-4">
                <h3 className="font-semibold mb-3">Recent Refunds</h3>
                <Table headers={headers} data={data} enableFilters={false} enableSelection={false} />
            </div>
        </div>
    );
};

export default RefundsReport;
