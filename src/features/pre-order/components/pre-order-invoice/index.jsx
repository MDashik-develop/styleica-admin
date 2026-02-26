import React from "react";

const PreOrderInvoice = ({ order }) => {
    if (!order) return null;

    return (
        <div
            style={{
                width: "3in",
                height: "full",
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
                <h3
                    style={{
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: "700",
                        color: "#111",
                    }}
                >
                    GENTERS
                </h3>
                <p style={{ margin: "2px 0", fontSize: "9px" }}>
                    Help Line: 01800-000000
                </p>
                <p style={{ margin: 0, fontSize: "9px", color: "#444" }}>
                    www.genters.com
                </p>
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
                    <strong>Invoice No:</strong> {order.invoice}
                </p>
                <p style={{ margin: "2px 0" }}>
                    <strong>Date:</strong> {order.date.created}
                </p>
                <p style={{ margin: "2px 0" }}>
                    <strong>Courier:</strong> {order.partner.deliveryArea}
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
                <p style={{ margin: "2px 0" }}>{order.customer.name}</p>
                <p style={{ margin: "2px 0" }}>{order.customer.address}</p>
                <p style={{ margin: "2px 0" }}>📞 {order.customer.mobile}</p>
            </div>

            {/* ===== Product Table ===== */}
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "9.5px",
                    marginBottom: "6px",
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "#f3f3f3", borderBottom: "1px solid #ccc" }}>
                        <th
                            style={{
                                textAlign: "left",
                                padding: "3px",
                            }}
                        >
                            Product
                        </th>
                        <th style={{ textAlign: "center", padding: "3px" }}>Qty</th>
                        <th style={{ textAlign: "right", padding: "3px" }}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        style={{
                            borderBottom: "1px dashed #ddd",
                        }}
                    >
                        <td style={{ padding: "3px" }}>
                            {order.pickup || "Product Name"}
                            <p style={{ display: "flex", gap: "3px", fontSize: "8px" }}>
                                <span>Red</span>
                                <span>-</span>
                                <span>M</span>
                            </p>
                        </td>
                        <td style={{ textAlign: "center", padding: "3px" }}>1</td>
                        <td style={{ textAlign: "right", padding: "3px" }}>
                            ৳{order.payment.sale}
                        </td>
                    </tr>
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
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "2px",
                    }}
                >
                    <span>Sub Total</span>
                    <span>৳{order.payment.sale}</span>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "2px",
                    }}
                >
                    <span>Delivery Fee</span>
                    <span>৳{order.deliveryFee.amount}</span>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "700",
                        marginBottom: "2px",
                    }}
                >
                    <span>Grand Total</span>
                    <span>
                        ৳{order.payment.sale + order.deliveryFee.amount}
                    </span>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "600",
                        marginBottom: "2px",
                        color: "green",
                    }}
                >
                    <span>Paid Amount</span>
                    <span>
                        ৳1680
                    </span>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "700",
                        color: "#d62828",
                    }}
                >
                    <span>Due Amount</span>
                    <span>৳{order.payment.due}</span>
                </div>
            </div>

            {/* ===== Footer ===== */}
            <div
                style={{
                    textAlign: "center",
                    paddingTop: "4px",
                    borderTop: "1px solid #ddd",
                }}
            >
                <p style={{ margin: 0, fontSize: "9px" }}>
                    Thank you for shopping with us!
                </p>
                <p style={{ margin: 0, fontSize: "8px", color: "#555", }}>
                    Powered by Genters POS
                </p>
            </div>
        </div>
    );
};

export default PreOrderInvoice;
