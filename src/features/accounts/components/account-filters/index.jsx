import React from "react";
import { MdOutlineDashboard, MdOutlineAttachMoney, MdOutlineMoneyOff, MdShowChart, MdWarehouse, MdOutlineAccountBalance } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import { RiRefund2Line } from "react-icons/ri";
const AccountsFilter = ({ active, setActive }) => {

    const data = [
        { id: 8, label: "Overview", status: "overview", icon: <MdOutlineDashboard /> },
        { id: 1, label: "Revenue", status: "revenue", icon: <MdOutlineAttachMoney /> },
        { id: 2, label: "Expenses", status: "expenses", icon: <MdOutlineMoneyOff /> },
        { id: 3, label: "Profit", status: "profit", icon: <MdShowChart /> },
        { id: 9, label: "Warehouse", status: "warehouse", icon: <MdWarehouse /> },
        { id: 4, label: "Tax", status: "tax", icon: <RiRefund2Line /> },
        { id: 5, label: "Balance Sheet", status: "balance sheet", icon: <MdOutlineAccountBalance /> },
        { id: 6, label: "Payables", status: "payable", icon: <FaMoneyCheckAlt /> },
        { id: 7, label: "Receivables", status: "receivable", icon: <FaHandHoldingUsd /> },
    ];

    return (
        <div className="space-y-2">
            <div className="flex items-center flex-wrap gap-3 pt-3">
                {data.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActive(item.status)}
                        className={`flex items-center gap-2 border px-3 py-1.5 text-sm transition
                            ${active === item.status
                                ? "bg-slate-200 border-slate-400"
                                : "bg-transparent border-slate-300"
                            }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AccountsFilter;
