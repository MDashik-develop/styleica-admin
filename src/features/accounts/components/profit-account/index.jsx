import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { FaMoneyBillWave, FaPercent, FaChartLine, FaCoins, FaRegFileAlt } from "react-icons/fa";
import { CurrencyIcon } from "../../../../components/reusable/ui/common-icons";

const ProfitAccount = () => {
    const kpis = [
        { title: "Net Profit", value: 108400, color: "text-green-600", icon: <FaMoneyBillWave /> },
        { title: "Profit Margin", value: "42%", color: "text-blue-600", icon: <FaPercent /> },
        { title: "ROI", value: "18%", color: "text-purple-600", icon: <FaChartLine /> },
        { title: "Gross Profit", value: 175000, color: "text-indigo-600", icon: <FaCoins /> },
        { title: "Operating Profit", value: 125000, color: "text-teal-600", icon: <FaRegFileAlt /> },
    ];

    const tableData = [
        { key: 1, category: "Sales", income: 254000, expense: 146000, profit: 108000 },
        { key: 2, category: "Returns", income: 0, expense: 20000, profit: -20000 },
        { key: 3, category: "Refunds", income: 0, expense: 18000, profit: -18000 },
        { key: 4, category: "Marketing", income: 0, expense: 35000, profit: -35000 },
        { key: 5, category: "Operations", income: 0, expense: 40000, profit: -40000 },
    ];

    const totalIncome = tableData.reduce((acc, cur) => acc + cur.income, 0);
    const totalExpense = tableData.reduce((acc, cur) => acc + cur.expense, 0);
    const totalProfit = tableData.reduce((acc, cur) => acc + cur.profit, 0);

    const profitTrend = [
        { month: "Jan", profit: 18000 },
        { month: "Feb", profit: 20000 },
        { month: "Mar", profit: 22000 },
        { month: "Apr", profit: 24000 },
        { month: "May", profit: 26000 },
        { month: "Jun", profit: 28000 },
    ];

    // Pie chart data must be positive
    const profitCategories = tableData.map((item) => ({
        name: item.category,
        value: Math.abs(item.profit),
        profit: item.profit,
    }));

    const COLORS = ["#4CAF50", "#F44336", "#FFC107", "#2196F3", "#9C27B0"];

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                {kpis.map((kpi, idx) => (
                    <div key={idx} className="card flex flex-col items-center p-4">
                        <div className="text-3xl mb-2 opacity-80">{kpi.icon}</div>
                        <p className="text-gray-500">{kpi.title}</p>
                        <h2 className={`text-2xl font-bold ${kpi.color} flex items-center gap-1`}>
                            {typeof kpi.value === "number" ? <CurrencyIcon /> : null} {kpi.value}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Profit Breakdown Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tableData.map((row) => (
                    <div key={row.key} className="card p-4 border">
                        <h4 className="font-semibold text-lg mb-2">{row.category}</h4>
                        <div className="flex justify-between items-center bg-slate-100 p-3">
                            <p className="text-gray-500 text-sm">Income</p>
                            <p className="text-green-600 text-xl flex items-center gap-1">
                                <CurrencyIcon /> {row.income.toLocaleString()}
                            </p>
                        </div>
                        <div className="flex justify-between items-center bg-slate-100 p-3 my-3">
                            <p className="text-gray-500 text-sm mt-1">Expense</p>
                            <p className="text-red-600 text-xl flex items-center gap-1">
                                <CurrencyIcon /> {row.expense.toLocaleString()}
                            </p>
                        </div>
                        <div className="flex justify-between items-center bg-slate-100 p-3">
                            <p className="text-gray-500 text-sm mt-1">Profit / Loss</p>
                            <p className={`text-xl flex items-center gap-1 font-bold ${row.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                                <CurrencyIcon /> {row.profit.toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Monthly Profit Trend */}
            <div className="card p-4">
                <h3 className="font-semibold text-lg mb-4">Monthly Net Profit Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={profitTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => <CurrencyIcon /> + value.toLocaleString()} />
                        <Line type="monotone" dataKey="profit" stroke="#4CAF50" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Profit by Category Pie Chart */}
            <div className="card p-4">
                <h3 className="font-semibold text-lg mb-4">Profit by Category</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={profitCategories}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={(entry) =>
                                    `${entry.name}: ${entry.profit >= 0 ? "+" : "-"}${Math.abs(entry.profit)}`
                                }
                            >
                                {profitCategories.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip formatter={(value, name, entry) => `${entry.profit >= 0 ? "+" : "-"}${value.toLocaleString()}`} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-1 gap-2">
                        {profitCategories.map((cat, idx) => (
                            <div key={idx} className="flex justify-between p-2 border rounded">
                                <span className="font-medium">{cat.name}</span>
                                <span className={cat.profit >= 0 ? "text-green-600" : "text-red-600"}>
                                    <CurrencyIcon /> {cat.profit.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfitAccount;
