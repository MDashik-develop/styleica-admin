import React from "react";
import { Tag } from "antd";
import CopyToClipboard from "../../../../../components/reusable/copy-to-clipboard";
import { CurrencyIcon, WhatsappIcon } from "../../../../../components/reusable/ui/common-icons";


const PreOrderInfo = ({ order }) => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Customer Info */}
            <div className="card">
                <h3 className="font-semibold text-lg mb-3">Customer Info</h3>
                <p className="font-medium">{order.customer.name}</p>
                <div className="flex items-center gap-2 mt-1">
                    <span>{order.customer.mobile}</span>
                    <CopyToClipboard value={order.customer.mobile} />
                    <button><WhatsappIcon /></button>
                </div>
                <p className="text-sm mt-1">{order.customer.address}</p>
            </div>

            {/* Payment Info */}
            <div className="card space-y-1">
                <h3 className="font-semibold text-lg mb-3">Payment Info</h3>
                <p>Total: <strong><CurrencyIcon />{order.payment.total}</strong></p>
                <p>Advance:
                    <span className="text-green-600"> <CurrencyIcon />{order.payment.advance}</span>
                </p>
                <p>Due:
                    <span className="text-red-600"> <CurrencyIcon />{order.payment.due}</span>
                </p>
                <p>Method: <Tag color="purple">{order.payment.method}</Tag></p>
            </div>

            {/* Courier Info */}
            <div className="card space-y-1">
                <h3 className="font-semibold text-lg mb-3">Delivery Partner</h3>
                <img src={order.courier.image} alt="courier" className="w-20 h-8 object-contain mb-2" />
                <p>{order.courier.name}</p>
                <p>Area: {order.courier.area}</p>
                <p>Fee: <CurrencyIcon />{order.courier.fee}</p>
                <Tag color="blue" className="capitalize mt-2">{order.courier.type}</Tag>
            </div>
        </div>
    );
};

export default PreOrderInfo;
