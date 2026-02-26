import React, { useState } from "react";


const ReportsFilter = ({ active, setActive }) => {

    const data = [
        { id: 2, label: "Orders", count: 8560, status: "orders" },
        { id: 3, label: "Returns", count: 220, status: "returns" },
        { id: 4, label: "Refunds", count: 180, status: "refunds" },
        { id: 5, label: "Cancellations", count: 340, status: "cancellations" },
        { id: 6, label: "Disputes", count: 95, status: "disputes" },
        { id: 7, label: "Payments", count: 3450, status: "payments" },
    ];

    return (
        <div className="space-y-2">
            {/* Top Filters */}
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
                        <span>{item.label}</span>
                        <span className="bg-primary/80 text-white px-1.5 py-[1px] text-[10px]">
                            {item.count}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReportsFilter;
