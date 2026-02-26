import React from "react";
import Table from "../../../../components/reusable/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const WarehouseAccount = () => {
    // ✅ Mock warehouse financial data
    const tableData = [
        { key: 1, warehouse: "Dhaka Central", inventoryValue: 450000, expenses: 35000, damaged: 2000, profitImpact: 15000 },
        { key: 2, warehouse: "Chittagong Hub", inventoryValue: 380000, expenses: 28000, damaged: 3000, profitImpact: 9000 },
        { key: 3, warehouse: "Sylhet Depot", inventoryValue: 220000, expenses: 19000, damaged: 1500, profitImpact: 4000 },
        { key: 4, warehouse: "Rajshahi Store", inventoryValue: 150000, expenses: 15000, damaged: 1000, profitImpact: 2500 },
    ];

    // ✅ Columns for Table
    const headers = [
        { title: "Warehouse", dataIndex: "warehouse", key: "warehouse" },
        { title: "Inventory Value", dataIndex: "inventoryValue", key: "inventoryValue" },
        { title: "Expenses", dataIndex: "expenses", key: "expenses" },
        { title: "Damaged Goods (৳)", dataIndex: "damaged", key: "damaged" },
        { title: "Profit Impact", dataIndex: "profitImpact", key: "profitImpact" },
    ];

    // ✅ Summary Calculations
    const totalInventory = tableData.reduce((acc, cur) => acc + cur.inventoryValue, 0);
    const totalExpenses = tableData.reduce((acc, cur) => acc + cur.expenses, 0);
    const totalDamaged = tableData.reduce((acc, cur) => acc + cur.damaged, 0);
    const totalProfitImpact = tableData.reduce((acc, cur) => acc + cur.profitImpact, 0);

    // ✅ Chart Data
    const chartData = tableData.map(item => ({
        name: item.warehouse,
        inventory: item.inventoryValue,
        expenses: item.expenses,
        profitImpact: item.profitImpact,
    }));

    return (
        <div className="space-y-8">

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card border p-4 text-center">
                    <h4 className="text-sm text-gray-600">Total Inventory Value</h4>
                    <p className="text-xl font-semibold text-green-600">৳{totalInventory.toLocaleString()}</p>
                </div>
                <div className="card border p-4 text-center">
                    <h4 className="text-sm text-gray-600">Total Expenses</h4>
                    <p className="text-xl font-semibold text-red-600">৳{totalExpenses.toLocaleString()}</p>
                </div>
                <div className="card border p-4 text-center">
                    <h4 className="text-sm text-gray-600">Damaged Goods</h4>
                    <p className="text-xl font-semibold text-orange-600">৳{totalDamaged.toLocaleString()}</p>
                </div>
                <div className="card border p-4 text-center">
                    <h4 className="text-sm text-gray-600">Net Profit Impact</h4>
                    <p className="text-xl font-semibold text-blue-600">৳{totalProfitImpact.toLocaleString()}</p>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="card">
                <h3 className="font-semibold text-lg mb-4">Warehouse Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="inventory" fill="#4CAF50" name="Inventory Value" />
                        <Bar dataKey="expenses" fill="#F44336" name="Expenses" />
                        <Bar dataKey="profitImpact" fill="#2196F3" name="Profit Impact" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Summary Table */}
            <div className="card">
                <h3 className="font-semibold text-lg mb-4">Warehouse Accounts Summary</h3>
                <Table
                    headers={headers}
                    data={tableData}
                    enableFilters={false}
                    enableSelection={false}
                    pagination={false}
                    summary={() => (
                        <Table.Summary fixed>
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0} className="font-semibold">Total</Table.Summary.Cell>
                                <Table.Summary.Cell index={1} className="font-semibold">
                                    ৳{totalInventory.toLocaleString()}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={2} className="font-semibold">
                                    ৳{totalExpenses.toLocaleString()}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={3} className="font-semibold">
                                    ৳{totalDamaged.toLocaleString()}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={4} className="font-semibold text-blue-600">
                                    ৳{totalProfitImpact.toLocaleString()}
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </Table.Summary>
                    )}
                />
            </div>
        </div>
    );
};

export default WarehouseAccount;
