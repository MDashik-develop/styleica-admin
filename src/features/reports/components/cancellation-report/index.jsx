import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Table from "../../../../components/reusable/table";

const CancellationsReport = () => {
    const stats = [
        { label: "Customer Cancellations", value: 220 },
        { label: "Admin Cancellations", value: 45 },
        { label: "Out of Stock", value: 75 },
    ];

    const COLORS = ["#3b82f6", "#f97316", "#ef4444"];

    const headers = [
        { title: "Cancellation ID", dataIndex: "id", key: "id" },
        { title: "Order ID", dataIndex: "order", key: "order" },
        { title: "Customer", dataIndex: "customer", key: "customer" },
        { title: "Type", dataIndex: "type", key: "type" },
        { title: "Date", dataIndex: "date", key: "date" },
    ];

    const data = [
        { key: 1, id: "#CAN-1001", order: "#ORD-1001", customer: "John Doe", type: "Customer", date: "2025-10-02" },
        { key: 2, id: "#CAN-1002", order: "#ORD-1005", customer: "Sarah Smith", type: "Out of Stock", date: "2025-10-05" },
        { key: 3, id: "#CAN-1003", order: "#ORD-1008", customer: "David Lee", type: "Admin", date: "2025-10-08" },
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
                <h3 className="font-semibold mb-2">Cancellation Types</h3>
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
                <h3 className="font-semibold mb-3">Recent Cancellations</h3>
                <Table headers={headers} data={data} enableFilters={false} enableSelection={false} />
            </div>
        </div>
    );
};

export default CancellationsReport;
