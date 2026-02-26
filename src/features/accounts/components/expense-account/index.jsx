import React from "react";
import { FaWallet, FaArrowDown, FaBullseye, FaTools, FaWarehouse, FaNetworkWired } from "react-icons/fa";
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
import { CurrencyIcon } from "../../../../components/reusable/ui/common-icons";

const ExpenseAccount = () => {
    // ✅ Monthly expense data
    const expenseData = [
        { month: "Jan", expense: 18000 },
        { month: "Feb", expense: 22000 },
        { month: "Mar", expense: 28000 },
        { month: "Apr", expense: 26000 },
        { month: "May", expense: 32000 },
        { month: "Jun", expense: 31000 },
        { month: "Jul", expense: 34000 },
        { month: "Aug", expense: 36000 },
        { month: "Sep", expense: 39000 },
        { month: "Oct", expense: 42000 },
    ];

    // ✅ Category-wise expense breakdown
    const categoryExpenses = [
        { name: "Marketing", value: 95000, icon: <FaBullseye /> },
        { name: "Operations", value: 85000, icon: <FaNetworkWired /> },
        { name: "Warehouse", value: 45000, icon: <FaWarehouse /> },
        { name: "Damages", value: 25000, icon: <FaTools /> },
    ];

    const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#F44336"];

    // ✅ Calculations
    const totalExpense = categoryExpenses.reduce((acc, cur) => acc + cur.value, 0);

    return (
        <div className="space-y-6">
            {/* Total Expenses Card */}
            <div className="card flex justify-between items-center">
                <div>
                    <p className="text-gray-500 text-sm">Total Expenses</p>
                    <h3 className="text-2xl font-semibold flex items-center gap-1">
                        <CurrencyIcon /> {totalExpense.toLocaleString()}
                    </h3>
                </div>
                <FaWallet className="text-3xl text-red-500" />
            </div>

            {/* Expense Category Breakdown */}
            <div className="card">
                <h3 className="font-semibold text-lg mb-4">Expense by Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pie Chart */}
                    <div className="flex justify-center">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryExpenses}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {categoryExpenses.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <Tooltip
                                    formatter={(value) => `${value.toLocaleString()}`}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Category Cards */}
                    <div className="space-y-4">
                        {categoryExpenses.map((cat, idx) => (
                            <div key={idx} className="card flex items-center gap-3 p-4 border">
                                <div className="text-3xl">{cat.icon}</div>
                                <div>
                                    <h4 className="font-semibold">{cat.name}</h4>
                                    <p className="text-lg font-bold flex items-center gap-1">
                                        <CurrencyIcon /> {cat.value.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Monthly Expense Trend */}
            <div className="card">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <FaArrowDown className="text-primary" /> Monthly Expense Overview
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={expenseData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="expense" fill="#F44336" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default ExpenseAccount;
