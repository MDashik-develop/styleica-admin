import { Tag } from "antd";
import React from "react";
import NoData from "../../../../../components/reusable/ui/no-data";


const OrderPayments = () => {

    return (
        <div className="bg-slate-100 p-4 mt-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h2 className="section-title">Payment History</h2>
                    <Tag color="geekblue">In Process</Tag>
                </div>
                <button className="button">Add Payment</button>
            </div>

            {/* content */}
            <div className="w-full min-h-96 flex justify-center items-center">
                <NoData />
            </div>
        </div>
    );
};

export default OrderPayments;