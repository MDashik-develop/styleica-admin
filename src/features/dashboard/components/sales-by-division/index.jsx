import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";

const divisions = [
    { name: "Dhaka", value: 4800, percent: 80 },
    { name: "Chittagong", value: 3600, percent: 60 },
    { name: "Rajshahi", value: 2900, percent: 50 },
    { name: "Khulna", value: 2500, percent: 45 },
    { name: "Sylhet", value: 2100, percent: 40 },
    { name: "Rangpur", value: 1800, percent: 35 },
    { name: "Barishal", value: 1500, percent: 30 },
    { name: "Mymensingh", value: 1300, percent: 25 },
];

const SalesByDivision = () => (
    <div className="bg-light p-5 shadow border border-slate-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
                <FaMapLocationDot className="text-lg text-purple-600" />
                <h3 className="font-semibold text-gray-800 text-base">
                    Sales by Division
                </h3>
            </div>
            <Link to="#" className="flex items-center gap-1 text-indigo-600 text-sm hover:text-indigo-800">
                View All
                <MdArrowOutward size={16} />
            </Link>
        </div>

        {/* List */}
        <ul className="space-y-4">
            {divisions.map((d, i) => (
                <li key={i} className="flex flex-col">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{d.name}</span>
                        <span className="text-gray-500">{d.value.toLocaleString()} sales</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full bg-gradient-to-r ${i % 3 === 0
                                ? "from-indigo-500 to-purple-500"
                                : i % 3 === 1
                                    ? "from-blue-500 to-cyan-500"
                                    : "from-pink-500 to-rose-500"
                                }`}
                            style={{ width: `${d.percent}%` }}
                        />
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

export default SalesByDivision;
