import React from "react";

const OrderSummary = ({ selectedProducts, paidAmount = 0, shippingAmount = 0, discountAmount = 0 }) => {
    // Calculate Subtotal
    const subTotal = selectedProducts.reduce((acc, product) => {
        const price = Number(product.price) || 0;
        const quantity = Number(product.quantity) || 0;
        return acc + price * quantity;
    }, 0);

    // Total after discount + shipping
    const total = subTotal + Number(shippingAmount || 0) - Number(discountAmount || 0);

    // Due amount
    const due = total - Number(paidAmount || 0);

    return (
        <div>
            <div className="bg-primary/10 border border-primary/60 mt-2">
                <h2 className="text-base font-semibold text-center bg-primary text-light py-1">Order Summary</h2>
                <div className="px-3 py-2 space-y-1">
                    <p className="flex justify-between items-center">
                        <span className="font-semibold">Sub-Total:</span>
                        <span>BDT {subTotal.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between items-center">
                        <span className="font-semibold">Shipping:</span>
                        <span> (+) BDT {Number(shippingAmount || 0).toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between items-center text-red-600">
                        <span className="font-semibold">Discount:</span>
                        <span> (-) BDT {Number(discountAmount || 0).toFixed(2)}</span>
                    </p>
                    {/* <p className="flex justify-between items-center text-green-600">
                        <span className="font-semibold">Paid:</span>
                        <span>BDT {Number(paidAmount || 0).toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between items-center text-red-600">
                        <span className="font-semibold">Due:</span>
                        <span>BDT {due.toFixed(2)}</span>
                    </p> */}
                    <p className="flex justify-between items-center text-lg font-semibold text-primary">
                        <span>Total:</span>
                        <span>BDT {total.toFixed(2)}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
