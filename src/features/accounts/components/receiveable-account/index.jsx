import React from "react";
import { CurrencyIcon } from "../../../../components/reusable/ui/common-icons";
import { FaUser, FaArrowUp } from "react-icons/fa";

const ReceivableAccount = () => {
    const totalReceivable = 35000;
    const topCustomers = [
        { name: "Customer A", amount: 15000 },
        { name: "Customer B", amount: 10000 },
        { name: "Customer C", amount: 6000 },
        { name: "Customer D", amount: 4000 },
    ];

    return (
        <div className="space-y-6">

            {/* Total Outstanding Receivables */}
            <div className="card flex justify-between items-center p-4">
                <div>
                    <p className="text-gray-500">Total Outstanding Receivables</p>
                    <h2 className="text-2xl font-bold text-green-600 flex items-center gap-1 mt-1">
                        <CurrencyIcon /> {totalReceivable.toLocaleString()}
                    </h2>
                </div>
                <FaArrowUp className="text-3xl text-green-500" />
            </div>

            {/* Top Customers Breakdown */}
            <div className="card p-4">
                <h3 className="font-semibold text-lg mb-4">Top Customers Owing</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {topCustomers.map((customer, idx) => {
                        const percentage = ((customer.amount / totalReceivable) * 100).toFixed(1);
                        return (
                            <div key={idx} className="flex justify-between items-center p-3 border border-slate-300 rounded bg-green-50">
                                <div className="flex items-center gap-2">
                                    <FaUser className="text-green-600" />
                                    <span>{customer.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CurrencyIcon /> {customer.amount.toLocaleString()} ({percentage}%)
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ReceivableAccount;
