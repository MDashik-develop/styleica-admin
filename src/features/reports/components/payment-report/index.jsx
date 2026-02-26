import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Table from "../../../../components/reusable/table";

const PaymentsReport = () => {
    const stats = [
        { label: "Pending Payments", value: 380 },
        { label: "Successful Payments", value: 3020 },
        { label: "Failed Payments", value: 50 },
    ];

    const monthlyData = [
        { month: "Jan", payments: 400, revenue: 12000 },
        { month: "Feb", payments: 500, revenue: 15000 },
        { month: "Mar", payments: 450, revenue: 13500 },
        { month: "Apr", payments: 600, revenue: 18000 },
        { month: "May", payments: 650, revenue: 19000 },
        { month: "Jun", payments: 700, revenue: 21000 },
    ];

    const headers = [
        { title: "Payment ID", dataIndex: "id", key: "id" },
        { title: "Order ID", dataIndex: "order", key: "order" },
        { title: "Customer", dataIndex: "customer", key: "customer" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Amount", dataIndex: "amount", key: "amount" },
    ];

    const data = [
        { key: 1, id: "#PAY-1001", order: "#ORD-1001", customer: "John Doe", status: "Success", amount: "$120" },
        { key: 2, id: "#PAY-1002", order: "#ORD-1002", customer: "Sarah Smith", status: "Pending", amount: "$80" },
        { key: 3, id: "#PAY-1003", order: "#ORD-1003", customer: "David Lee", status: "Failed", amount: "$60" },
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
                <h3 className="font-semibold mb-2">Monthly Payments</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="payments" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="card p-4">
                <h3 className="font-semibold mb-3">Recent Payments</h3>
                <Table headers={headers} data={data} enableFilters={false} enableSelection={false} />
            </div>
        </div>
    );
};

export default PaymentsReport;
