import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { MdTrendingUp } from "react-icons/md";

const data = [
    { month: "Jul", revenue: 12000 },
    { month: "Aug", revenue: 18000 },
    { month: "Sep", revenue: 14000 },
    { month: "Oct", revenue: 22000 },
    { month: "Nov", revenue: 18500 },
];

const RevenueOverview = () => {
    return (
        <div className="bg-light p-5 shadow border border-slate-200">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 text-base flex items-center gap-2">
                    <MdTrendingUp className="text-indigo-500" size={20} />
                    Revenue Overview
                </h3>
                <span className="text-sm text-gray-500">Last 5 Months</span>
            </div>

            <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey="month" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueOverview;
