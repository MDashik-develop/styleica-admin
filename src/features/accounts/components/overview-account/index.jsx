import React from "react";
import Table from "../../../../components/reusable/table";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";
import {
    FaWarehouse,
    FaShoppingCart,
    FaUndo,
    FaMoneyBillWave,
    FaStoreAlt,
    FaTools,
} from "react-icons/fa";
import { CurrencyIcon } from "../../../../components/reusable/ui/common-icons";

const OverviewAccount = () => {

    // ✅ Table Data
    const tableData = [
        { key: 1, category: "Sales", income: 125000, expenses: 40000, profit: 85000 },
        { key: 2, category: "Returns", income: 0, expenses: 12000, profit: -12000 },
        { key: 3, category: "Refunds", income: 0, expenses: 8000, profit: -8000 },
        { key: 4, category: "Warehouse", income: 0, expenses: 15000, profit: -15000 },
        { key: 5, category: "Damages", income: 0, expenses: 5000, profit: -5000 },
        { key: 6, category: "Operations", income: 0, expenses: 25000, profit: -25000 },
    ];

    // ✅ Table Columns
    const headers = [
        { title: "Category", dataIndex: "category", key: "category" },
        {
            title: "Income",
            dataIndex: "income",
            key: "income",
            render: (value) => (
                <span className="flex items-center justify-center gap-1">
                    <CurrencyIcon /> {value.toLocaleString()}
                </span>
            ),
        },
        {
            title: "Expenses",
            dataIndex: "expenses",
            key: "expenses",
            render: (value) => (
                <span className="flex items-center justify-center gap-1 text-red-600">
                    <CurrencyIcon /> {value.toLocaleString()}
                </span>
            ),
        },
        {
            title: "Profit / Loss",
            dataIndex: "profit",
            key: "profit",
            render: (value) => (
                <span
                    className={`flex items-center justify-center gap-1 ${value >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                >
                    <CurrencyIcon /> {value.toLocaleString()}
                </span>
            ),
        },
    ];

    // ✅ Chart Data
    const trendData = [
        { month: "Jan", income: 120000, expense: 65000 },
        { month: "Feb", income: 135000, expense: 72000 },
        { month: "Mar", income: 128000, expense: 69000 },
        { month: "Apr", income: 142000, expense: 71000 },
        { month: "May", income: 150000, expense: 83000 },
        { month: "Jun", income: 138000, expense: 76000 },
    ];

    const categoryChartData = tableData.map((item) => ({
        name: item.category,
        profit: item.profit,
    }));

    // ✅ Calculations
    const totalIncome = tableData.reduce((acc, cur) => acc + cur.income, 0);
    const totalExpense = tableData.reduce((acc, cur) => acc + cur.expenses, 0);
    const totalProfit = totalIncome - totalExpense;

    // ✅ KPI Metrics
    const metrics = [
        {
            title: "Total Sales",
            value: totalIncome.toLocaleString(),
            icon: <FaShoppingCart />,
            color: "bg-green-100 text-green-700",
        },
        {
            title: "Total Returns",
            value: "12,000",
            icon: <FaUndo />,
            color: "bg-yellow-100 text-yellow-700",
        },
        {
            title: "Refunds",
            value: "8,000",
            icon: <FaMoneyBillWave />,
            color: "bg-red-100 text-red-700",
        },
        {
            title: "Warehouse Expense",
            value: "15,000",
            icon: <FaWarehouse />,
            color: "bg-blue-100 text-blue-700",
        },
        {
            title: "Damaged Goods",
            value: "5,000",
            icon: <FaTools />,
            color: "bg-orange-100 text-orange-700",
        },
        {
            title: "Net Profit",
            value: totalProfit.toLocaleString(),
            icon: <FaStoreAlt />,
            color:
                totalProfit > 0
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700",
        },
    ];

    return (
        <div className="space-y-8">

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {metrics.map((metric, index) => (
                    <div
                        key={index}
                        className={`card flex items-center justify-between p-4 ${metric.color}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">{metric.icon}</div>
                            <div>
                                <h3 className="text-sm font-semibold">
                                    {metric.title}
                                </h3>
                                <p className="text-xl font-bold flex items-center gap-1">
                                    <CurrencyIcon /> {metric.value}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Financial Summary Table */}
            <div className="card">
                <h3 className="font-semibold text-lg mb-4">Financial Summary</h3>
                <Table
                    headers={headers}
                    data={tableData}
                    enableFilters={false}
                    enableSelection={false}
                    pagination={false}
                    summary={() => (
                        <Table.Summary fixed>
                            <Table.Summary.Row>
                                <Table.Summary.Cell
                                    index={0}
                                    className="font-semibold"
                                >
                                    Total
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={1} className="font-semibold">
                                    <span className="flex items-center justify-center gap-1">
                                        <CurrencyIcon /> {totalIncome.toLocaleString()}
                                    </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={2} className="font-semibold">
                                    <span className="flex items-center justify-center gap-1 text-red-600">
                                        <CurrencyIcon /> {totalExpense.toLocaleString()}
                                    </span>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={3} className="font-semibold">
                                    <span
                                        className={`flex items-center justify-center gap-1 ${totalProfit >= 0
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        <CurrencyIcon /> {totalProfit.toLocaleString()}
                                    </span>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>
                    )}
                />
            </div>

            {/* Category Profit Comparison Chart */}
            <div className="card">
                <h3 className="font-semibold text-lg mb-4">
                    Profit / Loss by Category
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="profit" fill="#4CAF50" name="Profit" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Income vs Expense Trend */}
            <div className="card">
                <h3 className="font-semibold text-lg mb-4">
                    Income vs Expense Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#4CAF50"
                            strokeWidth={2}
                            name="Income"
                        />
                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#F44336"
                            strokeWidth={2}
                            name="Expense"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OverviewAccount;
