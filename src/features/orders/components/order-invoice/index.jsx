import React from "react";
import dayjs from "dayjs";
// import { siteConfig } from "../../../../config/siteConfig";
import { useSelector } from "react-redux";

const OrderInvoice = ({ order }) => {

    const { data: siteConfig, loading } = useSelector(
        (state) => state.siteConfig
    );

    if (!order) return null;

    // console.log(siteConfig, "siteconfig in invoice");


    // Helper to render variant attributes
    const renderVariants = (variant_attributes) => {
        if (!variant_attributes || variant_attributes === "{}") return null;

        let parsed = {};
        try {
            parsed =
                typeof variant_attributes === "string"
                    ? JSON.parse(variant_attributes)
                    : variant_attributes;
        } catch {
            return null;
        }

        return (
            <p style={{ display: "flex", gap: "3px", fontSize: "8px", margin: 0 }}>
                {Object.entries(parsed).map(([key, val], idx) => (
                    <span key={key}>
                        {key}: {val?.value ?? val}
                        {idx < Object.entries(parsed).length - 1 && " | "}
                    </span>
                ))}
            </p>
        );
    };

    return (
        <div
            style={{
                width: "3in",
                padding: "10px",
                fontFamily: "Arial, sans-serif",
                fontSize: "10px",
                color: "#111",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                boxSizing: "border-box",
                margin: "auto",
                boxShadow: "0 0 3px rgba(0,0,0,0.1)",
                printColorAdjust: "exact",
                WebkitPrintColorAdjust: "exact",
            }}
        >
            {/* ===== Header ===== */}
            <div
                style={{
                    textAlign: "center",
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "4px",
                    marginBottom: "6px",
                }}
            >
                <h3 style={{ margin: 0, fontSize: "13px", fontWeight: "700" }}>{siteConfig?.companyName}</h3>
                <p style={{ margin: "2px 0", fontSize: "9px" }}>Help Line: {siteConfig?.phone}</p>
                <p style={{ margin: 0, fontSize: "9px", color: "#444" }}>www.genters.com</p>
            </div>

            {/* ===== Invoice Info ===== */}
            <div
                style={{
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #e0e0e0",
                    padding: "4px 6px",
                    marginBottom: "6px",
                }}
            >
                <p style={{ margin: "2px 0" }}>
                    <strong>Invoice No:</strong> {order.invoice_no}
                </p>
                <p style={{ margin: "2px 0" }}>
                    <strong>Date:</strong> {dayjs(order.created_at).format("DD MMM YYYY, hh:mm A")}
                </p>
                <p style={{ margin: "2px 0" }}>
                    <strong>Channel:</strong> {order.channel}
                </p>
            </div>

            {/* ===== Customer Info ===== */}
            <div
                style={{
                    backgroundColor: "#f2f7ff",
                    border: "1px solid #d0e1ff",
                    padding: "4px 6px",
                    marginBottom: "8px",
                }}
            >
                <p style={{ margin: "2px 0", fontWeight: "600" }}>Invoice To:</p>
                <p style={{ margin: "2px 0" }}>{order.customer?.name}</p>
                <p style={{ margin: "2px 0" }}>{order.customer?.address}</p>
                <p style={{ margin: "2px 0" }}>📞 {order.customer?.phone}</p>
            </div>

            {/* ===== Product Table ===== */}
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "9.5px", marginBottom: "6px" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f3f3f3", borderBottom: "1px solid #ccc" }}>
                        <th style={{ textAlign: "left", padding: "3px" }}>Product</th>
                        <th style={{ textAlign: "center", padding: "3px" }}>Qty</th>
                        <th style={{ textAlign: "right", padding: "3px" }}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item) => (
                        <tr key={item.id} style={{ borderBottom: "1px dashed #ddd" }}>
                            <td style={{ padding: "3px" }}>
                                <span style={{ fontWeight: "500" }}>{item.product?.name}</span>
                                {/* Safe rendering logic */}
                                {item.variant_attributes && renderVariants(item.variant_attributes)}
                            </td>
                            <td style={{ textAlign: "center", padding: "3px" }}>{item.quantity}</td>
                            <td style={{ textAlign: "right", padding: "3px" }}>৳{item.total_price}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

            {/* ===== Totals ===== */}
            <div
                style={{
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #e0e0e0",
                    padding: "4px 6px",
                    fontSize: "9.5px",
                    marginBottom: "6px",
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                    <span>Sub Total</span>
                    <span>৳{order.subtotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                    <span>Delivery Fee</span>
                    <span>৳{order.shipping_amount}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                    <span>Discount</span>
                    <span>- ৳{order.discount_amount}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", marginBottom: "2px" }}>
                    <span>Grand Total</span>
                    <span>৳{order.total_amount}</span>
                </div>
            </div>

            {/* ===== Footer ===== */}
            <div style={{ textAlign: "center", paddingTop: "4px", borderTop: "1px solid #ddd" }}>
                <p style={{ margin: 0, fontSize: "9px" }}>Thank you for shopping with us!</p>
                <p style={{ margin: 0, fontSize: "8px", color: "#555" }}>Developed by Vida Technology Ltd.</p>
            </div>
        </div>
    );
};

export default OrderInvoice;
