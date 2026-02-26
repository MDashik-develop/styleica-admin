import React from "react";


const DiscountFilter = ({ value, onChange }) => {

    const filters = [
        { key: "all", label: "ALL", count: 15 },
        { key: "active", label: "Active", count: 10 },
        { key: "expired", label: "Expired", count: 4 },
        { key: "upcoming", label: "Upcoming", count: 1 },
    ];

    return (
        <div className="flex items-center flex-wrap gap-3 pt-3">
            {filters.map((item) => (
                <button
                    key={item.key}
                    onClick={() => onChange(item.key)}
                    className={`flex items-center gap-2 border px-3 py-1.5 text-sm transition
                            ${value === item.key
                            ? "bg-slate-200 border-slate-400"
                            : "bg-transparent border-slate-300"
                        }`}
                >
                    {item.label}
                    <span className="bg-primary/80 text-white px-1.5 py-[1px] text-[10px]">
                        {item.count}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default DiscountFilter;
