import React from "react";
import { Divider } from "antd";


const PreOrderItems = ({ order }) => {

    return (
        <div className="card">
            <div className="flex justify-between items-center flex-wrap gap-3">
                <h3 className="font-semibold text-lg">Order Summary</h3>
                <div>
                    <p><strong>Created:</strong> {order.createdAt}</p>
                    <p><strong>Expected Delivery:</strong> {order.expectedDelivery}</p>
                </div>
            </div>

            <Divider />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items.map((item) => (
                    <div
                        key={item.id}
                        className="flex gap-4 card"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md border border-slate-200"
                        />
                        <div className="flex-1 text-xs">
                            <p className="font-medium text-dark text-sm">{item.name}</p>
                            <p className="text-slate-500">{item.attributes}</p>
                            <p className="text-slate-500">SKU: {item.code}</p>
                            <p className="mt-1">Qty: {item.quantity}</p>
                            <p className="font-semibold text-primary">
                                {item.price}৳ x {item.quantity} = {item.price * item.quantity}৳
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreOrderItems;
