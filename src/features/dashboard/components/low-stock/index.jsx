import React from "react";
import { MdWarningAmber } from "react-icons/md";

const LowStock = ({ lowStockItems = [] }) => {
    return (
        <div className="bg-light p-5 shadow border border-slate-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800 text-base flex items-center gap-2">
                    <MdWarningAmber className="text-red-600" size={20} />
                    Low Stock Products
                </h3>
                <span className="text-sm text-gray-500">Inventory Alert</span>
            </div>

            <div className="space-y-4">
                {lowStockItems.map((item, i) => {
                    const percent = Math.min((item.stock / (item.threshold-1)) * 100, 100);
                    const color =
                        percent < 30
                            ? "bg-red-500"
                            : percent < 60
                                ? "bg-amber-500"
                                : "bg-green-500";

                    return (
                        <div
                            key={i}
                            className="border border-slate-200 p-3"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <p className="font-medium text-gray-700">{item.name}</p>
                                <span className="text-sm text-gray-500">{item.stock} left</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2">
                                <div
                                    className={`h-2 rounded-full ${color}`}
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

export default LowStock;
