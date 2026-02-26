import React from "react";
import { CurrencyIcon } from "../../../../components/reusable/ui/common-icons";
import { FaCashRegister, FaBox, FaUserFriends, FaMoneyBillWave, FaFileInvoiceDollar, FaBalanceScale } from "react-icons/fa";

const BalanceAccount = () => {
    // Asset and Liability data
    const assets = [
        { name: "Cash", value: 80000, icon: <FaCashRegister className="text-green-600" /> },
        { name: "Inventory", value: 60000, icon: <FaBox className="text-blue-600" /> },
        { name: "Accounts Receivable", value: 35000, icon: <FaUserFriends className="text-purple-600" /> },
    ];

    const liabilities = [
        { name: "Loans", value: 40000, icon: <FaMoneyBillWave className="text-red-600" /> },
        { name: "Accounts Payable", value: 20000, icon: <FaFileInvoiceDollar className="text-orange-600" /> },
        { name: "Tax Payable", value: 4500, icon: <FaBalanceScale className="text-blue-600" /> },
    ];

    const totalAssets = assets.reduce((sum, item) => sum + item.value, 0);
    const totalLiabilities = liabilities.reduce((sum, item) => sum + item.value, 0);
    const netWorth = totalAssets - totalLiabilities;

    return (
        <div className="space-y-6">

            {/* Assets & Liabilities Cards */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Assets */}
                <div className="card p-4">
                    <h3 className="font-semibold text-lg mb-4">Assets</h3>
                    <div className="space-y-3">
                        {assets.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center p-2 border border-slate-300 rounded bg-green-50">
                                <div className="flex items-center gap-2">{item.icon} <span>{item.name}</span></div>
                                <div className="flex items-center gap-1">
                                    <CurrencyIcon /> {item.value.toLocaleString()} ({((item.value / totalAssets) * 100).toFixed(1)}%)
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-between font-semibold border-t border-slate-300 pt-2">
                        <span>Total Assets</span>
                        <span className="flex items-center gap-1"><CurrencyIcon /> {totalAssets.toLocaleString()}</span>
                    </div>
                </div>

                {/* Liabilities */}
                <div className="card p-4">
                    <h3 className="font-semibold text-lg mb-4">Liabilities</h3>
                    <div className="space-y-3">
                        {liabilities.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center p-2 border border-slate-300 rounded bg-red-50">
                                <div className="flex items-center gap-2">{item.icon} <span>{item.name}</span></div>
                                <div className="flex items-center gap-1">
                                    <CurrencyIcon /> {item.value.toLocaleString()} ({((item.value / totalLiabilities) * 100).toFixed(1)}%)
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-between font-semibold border-t border-slate-300 pt-2">
                        <span>Total Liabilities</span>
                        <span className="flex items-center gap-1"><CurrencyIcon /> {totalLiabilities.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Net Worth */}
            <div className="card text-center p-6 bg-blue-50">
                <h3 className="font-semibold text-lg">Net Worth</h3>
                <h2 className="text-3xl font-bold text-green-600 mt-2 flex justify-center items-center gap-1">
                    <CurrencyIcon /> {netWorth.toLocaleString()}
                </h2>
                <p className="text-gray-500 mt-1">Assets minus Liabilities</p>
            </div>

        </div>
    );
};

export default BalanceAccount;
