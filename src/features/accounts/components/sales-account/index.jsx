import React from "react";
import { FaChartLine, FaShoppingBag, FaArrowUp } from "react-icons/fa";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const SalesAccount = () => {
    const salesData = [
        { month: "Jan", total: 85000 },
        { month: "Feb", total: 92000 },
        { month: "Mar", total: 118000 },
        { month: "Apr", total: 110000 },
        { month: "May", total: 135000 },
        { month: "Jun", total: 142000 },
        { month: "Jul", total: 158000 },
        { month: "Aug", total: 165000 },
        { month: "Sep", total: 178000 },
        { month: "Oct", total: 192000 },
    ];

    return (
        <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm">Total Sales</p>
                        <h3 className="text-2xl font-semibold">৳1,920,000</h3>
                    </div>
                    <FaShoppingBag className="text-3xl text-green-600" />
                </div>

                <div className="card flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm">Online Orders</p>
                        <h3 className="text-2xl font-semibold">8,560</h3>
                    </div>
                    <FaChartLine className="text-3xl text-blue-500" />
                </div>

                <div className="card flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm">Avg. Order Value</p>
                        <h3 className="text-2xl font-semibold">৳1,120</h3>
                    </div>
                    <FaArrowUp className="text-3xl text-orange-500" />
                </div>

                <div className="card flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm">Repeat Customers</p>
                        <h3 className="text-2xl font-semibold">38%</h3>
                    </div>
                    <FaChartLine className="text-3xl text-purple-500" />
                </div>
            </div>

            <div className="card">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <FaChartLine className="text-primary" /> Monthly Sales Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="total" stroke="#4CAF50" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesAccount;
