import React from "react";
import {
    MdAssignment,
    MdLocalShipping,
    MdStorefront,
    MdShoppingCart,
    MdAttachMoney,
    MdTrendingUp,
    MdGroup,
    MdAccountBalanceWallet,
} from "react-icons/md";



const Stats = ({ dashboards = [] }) => {
    const stats = [
        {
            title: "Total Revenue",
            value: dashboards?.total_revenue? `৳${dashboards?.total_revenue}` : 0,
            // sub: "↑ 12% this month",
            icon: MdAttachMoney,
            color: "bg-green-100 text-green-600",
        },
        {
            title: "Total Transactions",
            value: dashboards?.total_transactions? `${dashboards?.total_transactions}` : 0,
            // sub: "New 85 this week",
            icon: MdTrendingUp,
            color: "bg-orange-100 text-orange-600",
        },
        {
            title: "Net Profit",
            value: dashboards?.net_profit? `৳${dashboards?.net_profit}` : 0,
            // sub: "↑ 8% from last month",
            icon: MdAccountBalanceWallet,
            color: "bg-teal-100 text-teal-600",
        },
        {
            title: "Store Product",
            value: dashboards?.total_store_products? `${dashboards?.total_store_products}` : 0,
            // sub: "352 Sold",
            icon: MdStorefront,
            color: "bg-blue-100 text-blue-600",
        },
        {
            title: "Total Orders",
            value: dashboards?.total_Orders? `${dashboards?.total_Orders}` : 0,
            sub: "300 New Users",
            icon: MdGroup,
            color: "bg-yellow-100 text-yellow-600",
        },
        {
            title: "Processed Orders",
            value: dashboards?.total_orders_provided? `${dashboards?.total_orders_provided}` : 0,
            // sub: "109 Processing",
            icon: MdAssignment,
            color: "bg-indigo-100 text-indigo-600",
        },
        {
            title: "Return Orders",
            value: dashboards?.total_return? `${dashboards?.total_return}` : 0,
            sub: "315 Total",
            icon: MdShoppingCart,
            color: "bg-purple-100 text-purple-600",
        },
        {
            title: "Shipped Orders",
            value: dashboards?.total_orders_dispatched? `${dashboards?.total_orders_dispatched}` : 0,
            // sub: "49 Return",
            icon: MdLocalShipping,
            color: "bg-pink-100 text-pink-600",
        },
    ];
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ title, value, sub, icon: Icon, color }, i) => (
                <div
                    key={i}
                    className="p-2 lg:p-5 flex justify-between items-center border border-slate-200 shadow"
                >
                    <div>
                        <h3 className="text-gray-500 text-xs lg:text-sm">{title}</h3>
                        <p className="text-base lg:text-2xl font-semibold">{value}</p>
                        <p className="text-gray-400 text-xs">{sub}</p>
                    </div>
                    <div className={`p-1 lg:p-3 rounded-xl ${color}`}>
                        <Icon size={24} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Stats;
