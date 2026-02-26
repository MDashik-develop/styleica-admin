import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { MdPeopleAlt } from "react-icons/md";

const data = [
    { name: "New Customers", value: 35 },
    { name: "Returning", value: 50 },
    { name: "Churned", value: 15 },
];

const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

const CustomerInsights = () => {
    return (
        <div className="bg-light p-5 shadow border border-slate-200">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 text-base flex items-center gap-2">
                    <MdPeopleAlt className="text-indigo-500" size={20} />
                    Customer Insights
                </h3>
                <span className="text-sm text-gray-500">Last 30 Days</span>
            </div>

            <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            dataKey="value"
                            paddingAngle={5}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CustomerInsights;
