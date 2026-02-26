import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaChartLine } from "react-icons/fa";



const PerformanceChart = ({ data }) => {
// const data = [
//     { month: "Jan", revenue: 2.3 },
//     { month: "Mar", revenue: 3.1 },
//     { month: "May", revenue: 4.0 },
//     { month: "Jul", revenue: 5.3 },
//     { month: "Sep", revenue: 3.8 },
//     { month: "Nov", revenue: 4.6 },
// ];
    return (
    <div className="bg-light p-5 shadow border border-slate-200">
        <div className="flex items-center gap-2 mb-3">
            <FaChartLine className="text-lg text-[#6366f1]" />
            <h3 className="font-semibold">Performance Overview</h3>
        </div>
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    </div>
);
};
export default PerformanceChart;
