import React from "react";
import { Tag } from "antd";
import Table from "../../../../components/reusable/table";
import { EditIcon } from "../../../../components/reusable/ui/common-icons";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";
import { Link } from "react-router-dom";
import TransactionFilter from "../../components/all-transactions/transaction-filter";


const AllTransactions = () => {


    // Dummy transaction data
    const transactions = [
        {
            key: 1,
            id: "#TXN-001",
            date: "09 Oct, 2025",
            customer: { name: "Avi Debnath", mobile: "0172365458" },
            type: "sale",
            method: "Cash",
            amount: 1050,
            order: "#INV-1001",
            note: "Full paid",
            status: "completed",
        },
        {
            key: 2,
            id: "#TXN-002",
            date: "10 Oct, 2025",
            customer: { name: "Nusrat Jahan", mobile: "01822567890" },
            type: "refund",
            method: "bKash",
            amount: 500,
            order: "#INV-1002",
            note: "Partial refund",
            status: "refunded",
        },
        {
            key: 3,
            id: "#TXN-003",
            date: "12 Oct, 2025",
            customer: { name: "Sadia Rahman", mobile: "01552445789" },
            type: "sale",
            method: "Nagad",
            amount: 1450,
            order: "#INV-1006",
            note: "-",
            status: "completed",
        },
        {
            key: 4,
            id: "#TXN-004",
            date: "13 Oct, 2025",
            customer: { name: "Mehedi Hasan", mobile: "01456677889" },
            type: "expense",
            method: "Cash",
            amount: 200,
            order: "-",
            note: "Delivery expense",
            status: "approved",
        },
        {
            key: 5,
            id: "#TXN-005",
            date: "15 Oct, 2025",
            customer: { name: "Samiha Chowdhury", mobile: "01922554466" },
            type: "sale",
            method: "Bank Transfer",
            amount: 2600,
            order: "#INV-1010",
            note: "COD received",
            status: "completed",
        },
        {
            key: 6,
            id: "#TXN-006",
            date: "17 Oct, 2025",
            customer: { name: "Tanvir Ahmed", mobile: "01988557766" },
            type: "refund",
            method: "bKash",
            amount: 700,
            order: "#INV-1008",
            note: "Returned item",
            status: "pending",
        },
    ];

    // Table headers
    const headers = [
        {
            title: "Transaction ID",
            dataIndex: "id",
            key: "id",
            render: (id, record) => (
                <div className="space-y-1">
                    <div className="flex justify-center items-center gap-1">
                        <CopyToClipboard value={id} />
                        <button><EditIcon /></button>
                    </div>
                    <Link to={`/transactions/${record.key}`} className="text-blue-600 hover:underline">
                        {id}
                    </Link>
                </div>
            ),
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (date) => <p>{date}</p>,
        },
        {
            title: "Customer",
            dataIndex: "customer",
            key: "customer",
            render: (customer) => (
                <div className="space-y-0.5">
                    <p className="text-primary font-semibold">{customer?.name}</p>
                    <div className="flex justify-center items-center gap-1">
                        <span>{customer?.mobile}</span>
                        <CopyToClipboard value={customer?.mobile} />
                    </div>
                </div>
            ),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (type) => {
                const colors = {
                    sale: "green",
                    refund: "volcano",
                    expense: "blue",
                };
                return (
                    <Tag color={colors[type]} className="capitalize">
                        {type}
                    </Tag>
                );
            },
        },
        {
            title: "Payment Method",
            dataIndex: "method",
            key: "method",
            render: (method) => <Tag color="cyan">{method}</Tag>,
        },
        {
            title: "Amount (BDT)",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => <p className="font-semibold">{amount.toFixed(2)}</p>,
        },
        {
            title: "Order Ref.",
            dataIndex: "order",
            key: "order",
            render: (order) =>
                order !== "-" ? (
                    <Link to={`/orders/view/${order}`} className="text-blue-500 hover:underline">
                        {order}
                    </Link>
                ) : (
                    <Tag color="gray">N/A</Tag>
                ),
        },
        {
            title: "Note",
            dataIndex: "note",
            key: "note",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const colors = {
                    completed: "green",
                    refunded: "volcano",
                    approved: "blue",
                    pending: "orange",
                };
                return (
                    <Tag color={colors[status]} className="capitalize">
                        {status}
                    </Tag>
                );
            },
        },
    ];

    return (
        <>
            {/* Header */}
            <h2 className="title ">Transactions</h2>

            {/* Filter */}
            <TransactionFilter />


            {/* Table */}
            <div>
                <Table
                    headers={headers}
                    data={transactions}
                    onSelectRows={(rows) => console.log("Selected Transactions:", rows)}
                />
            </div>
        </>
    );
};

export default AllTransactions;
