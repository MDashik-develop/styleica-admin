import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import { FaShoppingCart, FaStoreAlt, FaUndo, FaCoins } from "react-icons/fa";
import { CurrencyIcon } from "../../../../components/reusable/ui/common-icons";

const RevenueAccount = () => {
    // ✅ Monthly Revenue Data
    const monthlyRevenue = [
        { month: "Jan", actual: 34000, target: 35000 },
        { month: "Feb", actual: 38500, target: 40000 },
        { month: "Mar", actual: 42500, target: 42000 },
        { month: "Apr", actual: 45000, target: 46000 },
        { month: "May", actual: 48000, target: 47000 },
        { month: "Jun", actual: 51000, target: 50000 },
    ];

    // ✅ Revenue Category Breakdown
    const categoryRevenue = [
        { name: "Online Sales", value: 150000, icon: <FaShoppingCart /> },
        { name: "In-store Sales", value: 104000, icon: <FaStoreAlt /> },
        { name: "Refunds", value: 20000, icon: <FaUndo /> },
        { name: "Other Revenue", value: 30000, icon: <FaCoins /> },
    ];

    const COLORS = ["#10b981", "#3b82f6", "#f87171", "#facc15"];

    // ✅ Calculations
    const totalRevenue = categoryRevenue.reduce((acc, cur) => acc + cur.value, 0);
    const netRevenue =
        totalRevenue -
        (categoryRevenue.find((c) => c.name === "Refunds")?.value || 0);

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="card text-center p-4">
                    <p className="text-gray-500">Total Revenue</p>
                    <h2 className="text-2xl font-bold text-green-600 flex justify-center items-center gap-1">
                        <CurrencyIcon /> {totalRevenue.toLocaleString()}
                    </h2>
                </div>
                <div className="card text-center p-4">
                    <p className="text-gray-500">Net Revenue</p>
                    <h2 className="text-2xl font-bold text-blue-600 flex justify-center items-center gap-1">
                        <CurrencyIcon /> {netRevenue.toLocaleString()}
                    </h2>
                </div>
                <div className="card text-center p-4">
                    <p className="text-gray-500">Online Sales</p>
                    <h2 className="text-2xl font-bold text-indigo-600 flex justify-center items-center gap-1">
                        <CurrencyIcon /> 150,000
                    </h2>
                </div>
                <div className="card text-center p-4">
                    <p className="text-gray-500">In-Store Sales</p>
                    <h2 className="text-2xl font-bold text-orange-600 flex justify-center items-center gap-1">
                        <CurrencyIcon /> 104,000
                    </h2>
                </div>
            </div>

            {/* Revenue Category Breakdown */}
            <div className="card p-4">
                <h3 className="font-semibold text-lg mb-4">Revenue by Category</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex justify-center">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryRevenue}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {categoryRevenue.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Category Cards */}
                    <div className="space-y-4">
                        {categoryRevenue.map((cat, idx) => {
                            const percentage = ((cat.value / totalRevenue) * 100).toFixed(1);
                            return (
                                <div key={idx} className="card flex items-center gap-3 p-4 border">
                                    <div className="text-3xl">{cat.icon}</div>
                                    <div>
                                        <h4 className="font-semibold">{cat.name}</h4>
                                        <p className="text-lg font-bold flex items-center gap-1">
                                            <CurrencyIcon /> {cat.value.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-gray-500">{percentage}% of total</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Monthly Revenue Trend */}
            <div className="card p-4">
                <h3 className="font-semibold text-lg mb-4">Monthly Revenue vs Target</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="actual" fill="#10b981" name="Actual Revenue" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="target" fill="#3b82f6" name="Target Revenue" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default RevenueAccount;
