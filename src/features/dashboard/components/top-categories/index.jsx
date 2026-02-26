import React from "react";
import { MdCategory } from "react-icons/md";


const TopCategories = ({ categories = [] }) => {
    return (
        <div className="bg-light p-5 shadow border border-slate-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800 text-base flex items-center gap-1">
                    <MdCategory className="text-indigo-500" size={20} />
                    Top Categories
                </h3>
                <span className="text-sm text-gray-500">Sales Report</span>
            </div>

            <div className="space-y-4">
                {categories.map((cat, i) => {
                    const percent = Math.min((cat.sales / cat.total) * 100, 100);
                    return (
                        <div
                            key={i}
                            className="border border-slate-200 p-3"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-medium text-gray-700">{cat.name}</p>
                                <span className="text-sm font-semibold text-indigo-600">
                                    {cat.sales.toLocaleString()} sold
                                </span>
                            </div>
                            <div className="w-full bg-slate-100 h-2">
                                <div
                                    className="h-2 rounded-full bg-indigo-500"
                                    style={{ width: `${percent}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TopCategories;
