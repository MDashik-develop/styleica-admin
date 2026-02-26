import React from "react";
import { Tag } from "antd";
import { Link, useParams } from "react-router-dom";
import { FaUserCircle, FaRegCalendarAlt, FaClipboardList, FaComments, FaArrowLeft } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { IoMdCheckmarkCircle, IoMdTime } from "react-icons/io";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";

const TransactionDetails = () => {

    const { id } = useParams();

    // Dummy data (simulate fetched transaction)
    const transaction = {
        id: "#TXN-001",
        date: "09 Oct, 2025",
        customer: { name: "Avi Debnath", mobile: "0172365458" },
        type: "sale",
        method: "Cash",
        amount: 1050,
        order: "#INV-1001",
        note: "Full paid",
        status: "completed",
    };

    const statusColors = {
        completed: "green",
        refunded: "volcano",
        approved: "blue",
        pending: "orange",
    };

    return (
        <div>

            <h2 className="title">Transaction Details</h2>

            {/* Transaction Info Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="card grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                        <FaClipboardList className="text-[53px] text-primary" />
                        <div>
                            <h3 className="font-semibold text-lg mb-1">
                                Transaction ID: {transaction.id}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaRegCalendarAlt /> <span>{transaction.date}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 justify-end">
                        <Tag color={statusColors[transaction.status]}>
                            {transaction.status.toUpperCase()}
                        </Tag>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="card">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <FaUserCircle className="text-primary" /> Customer Information
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div>
                            <p className="font-medium">Name:</p>
                            <p>{transaction.customer.name}</p>
                        </div>
                        <div>
                            <p className="font-medium">Mobile:</p>
                            <div className="flex items-center gap-2">
                                <span>{transaction.customer.mobile}</span>
                                <CopyToClipboard value={transaction.customer.mobile} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="card">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <MdPayment className="text-primary" /> Payment Details
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div>
                            <p className="font-medium">Payment Type:</p>
                            <Tag color="green" className="capitalize">
                                {transaction.type}
                            </Tag>
                        </div>
                        <div>
                            <p className="font-medium">Method:</p>
                            <Tag color="cyan">{transaction.method}</Tag>
                        </div>
                        <div>
                            <p className="font-medium">Amount (BDT):</p>
                            <p className="font-semibold text-lg">
                                ৳{transaction.amount.toFixed(2)}
                            </p>
                        </div>
                        <div>
                            <p className="font-medium">Order Reference:</p>
                            {transaction.order !== "-" ? (
                                <Link
                                    to={`/orders/view/${transaction.order}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {transaction.order}
                                </Link>
                            ) : (
                                <Tag color="gray">N/A</Tag>
                            )}
                        </div>
                    </div>
                </div>

                {/* Note & Status Section */}
                <div className="card grid sm:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            <FaComments className="text-primary" /> Notes
                        </h3>
                        <p className="text-gray-700">{transaction.note}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                            {transaction.status === "completed" ? (
                                <IoMdCheckmarkCircle className="text-green-600" />
                            ) : (
                                <IoMdTime className="text-orange-500" />
                            )}
                            Status Info
                        </h3>
                        <Tag color={statusColors[transaction.status]}>
                            {transaction.status.toUpperCase()}
                        </Tag>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;
