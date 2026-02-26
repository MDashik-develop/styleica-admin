import React from "react";
import { CurrencyIcon } from "../../../../components/reusable/ui/common-icons";

const TaxAccount = () => {
    const kpis = [
        { title: "Total Tax Collected", value: 18500, color: "text-orange-600" },
        { title: "Tax Paid", value: 14000, color: "text-red-600" },
        { title: "Pending Tax", value: 4500, color: "text-blue-600" },
        { title: "Tax Refunds", value: 1200, color: "text-green-600" },
        { title: "Effective Tax Rate", value: "18%", color: "text-purple-600" },
    ];

    const taxCategories = [
        { category: "Sales", collected: 12000, paid: 9000, pending: 3000 },
        { category: "Returns", collected: 2000, paid: 2000, pending: 0 },
        { category: "Refunds", collected: 1500, paid: 0, pending: 1500 },
        { category: "Other Fees", collected: 2000, paid: 1000, pending: 1000 },
    ];

    const totalCollected = taxCategories.reduce((sum, c) => sum + c.collected, 0);
    const totalPaid = taxCategories.reduce((sum, c) => sum + c.paid, 0);
    const totalPending = taxCategories.reduce((sum, c) => sum + c.pending, 0);

    return (
        <div className="space-y-6">

            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                {kpis.map((kpi, idx) => (
                    <div key={idx} className="card p-4 flex flex-col items-center">
                        <p className="text-gray-500">{kpi.title}</p>
                        <h2 className={`text-2xl font-bold mt-2 ${kpi.color} flex items-center gap-1`}>
                            {typeof kpi.value === "number" ? <CurrencyIcon /> : null} {kpi.value}
                        </h2>
                    </div>
                ))}
            </div>

            {/* Tax Breakdown by Category - Card Layout */}
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Tax Breakdown by Category</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {taxCategories.map((cat, idx) => (
                        <div key={idx} className="card p-4 border flex flex-col gap-2">
                            <h4 className="font-semibold text-gray-700">{cat.category}</h4>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Collected</span>
                                <span className="text-green-600 flex items-center gap-1">
                                    <CurrencyIcon /> {cat.collected.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Paid</span>
                                <span className="text-red-600 flex items-center gap-1">
                                    <CurrencyIcon /> {cat.paid.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Pending</span>
                                <span className="text-blue-600 flex items-center gap-1">
                                    <CurrencyIcon /> {cat.pending.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total Summary */}
                <div className="card p-4 border flex justify-between items-center font-semibold bg-gray-50">
                    <span>Total</span>
                    <div className="flex gap-6">
                        <span className="text-green-700 flex items-center gap-1">
                            <CurrencyIcon /> {totalCollected.toLocaleString()}
                        </span>
                        <span className="text-red-700 flex items-center gap-1">
                            <CurrencyIcon /> {totalPaid.toLocaleString()}
                        </span>
                        <span className="text-blue-700 flex items-center gap-1">
                            <CurrencyIcon /> {totalPending.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Notes / Summary */}
            <div className="card p-4">
                <h3 className="font-semibold text-lg mb-2">Summary</h3>
                <p className="text-gray-700 leading-relaxed">
                    This section provides a clear breakdown of tax collected, paid, and pending for each category.
                    Ensure timely tax payments to avoid penalties. Refunds are processed for eligible returns and adjustments.
                </p>
            </div>

        </div>
    );
};

export default TaxAccount;
