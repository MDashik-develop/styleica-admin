import React from "react";
import { CurrencyIcon } from "../../../../components/reusable/ui/common-icons";
import { FaBuilding, FaArrowDown } from "react-icons/fa";

const PayableAccount = () => {
    const totalPayable = 28000;
    const topVendors = [
        { name: "Vendor A", amount: 10000 },
        { name: "Vendor B", amount: 8500 },
        { name: "Vendor C", amount: 6000 },
        { name: "Utility Service", amount: 3500 },
    ];

    return (
        <div className="space-y-6">

            {/* Total Outstanding Payables */}
            <div className="card flex justify-between items-center p-4">
                <div>
                    <p className="text-gray-500">Total Outstanding Payables</p>
                    <h2 className="text-2xl font-bold text-red-600 flex items-center gap-1 mt-1">
                        <CurrencyIcon /> {totalPayable.toLocaleString()}
                    </h2>
                </div>
                <FaArrowDown className="text-3xl text-red-500" />
            </div>

            {/* Top Vendors Breakdown */}
            <div className="card p-4">
                <h3 className="font-semibold text-lg mb-4">Top Vendors Owed</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {topVendors.map((vendor, idx) => {
                        const percentage = ((vendor.amount / totalPayable) * 100).toFixed(1);
                        return (
                            <div key={idx} className="flex justify-between items-center p-3 border border-slate-300 rounded bg-red-50">
                                <div className="flex items-center gap-2">
                                    <FaBuilding className="text-red-600" />
                                    <span>{vendor.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CurrencyIcon /> {vendor.amount.toLocaleString()} ({percentage}%)
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PayableAccount;
