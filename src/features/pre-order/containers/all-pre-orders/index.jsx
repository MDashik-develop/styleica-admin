import React, { useState } from "react";
import { Tag } from "antd";
import Table from "../../../../components/reusable/table";
import { EditIcon, ViewIcon, WhatsappIcon } from "../../../../components/reusable/ui/common-icons";
import { Link } from "react-router-dom";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";
import Print from "../../../../components/reusable/print";
import PreOrderInvoice from "../../components/pre-order-invoice";


const AllPreOrders = () => {

    const [filteredStatus, setFilteredStatus] = useState("all");

    // Dummy Pre-Order Data
    const preOrders = [
        {
            key: 1,
            invoice: "#PRE-2001",
            date: { created: "05 Oct, 2025", expected: "25 Oct, 2025" },
            customer: { name: "Tanzina Akter", mobile: "01799001122", address: "Dhanmondi, Dhaka" },
            pickup: "Genters Fashion",
            payment: { total: 3200, advance: 500, due: 2700 },
            partner: { image: "https://i.ibb.co.com/4xR6G1M/pathao.jpg", deliveryArea: "Dhaka" },
            deliveryFee: { type: "prepaid", amount: 120 },
            note: "Pre-order item arriving soon",
            status: "pending",
        },
        {
            key: 2,
            invoice: "#PRE-2002",
            date: { created: "06 Oct, 2025", expected: "30 Oct, 2025" },
            customer: { name: "Rifat Rahman", mobile: "01888001133", address: "Narayanganj" },
            pickup: "Urban Trends",
            payment: { total: 2500, advance: 1000, due: 1500 },
            partner: { image: "https://i.ibb.co.com/4xR6G1M/pathao.jpg", deliveryArea: "Narayanganj" },
            deliveryFee: { type: "standard", amount: 150 },
            note: "Customer will confirm before dispatch",
            status: "on_hold",
        },
        {
            key: 3,
            invoice: "#PRE-2003",
            date: { created: "07 Oct, 2025", expected: "01 Nov, 2025" },
            customer: { name: "Hasibul Islam", mobile: "01677002244", address: "Sylhet" },
            pickup: "Luxe Beauty",
            payment: { total: 1850, advance: 1850, due: 0 },
            partner: { image: "https://i.ibb.co.com/4xR6G1M/pathao.jpg", deliveryArea: "Sylhet" },
            deliveryFee: { type: "express", amount: 180 },
            note: "Full payment received before shipment",
            status: "confirmed",
        },
        {
            key: 4,
            invoice: "#PRE-2004",
            date: { created: "09 Oct, 2025", expected: "29 Oct, 2025" },
            customer: { name: "Sakib Khan", mobile: "01755551100", address: "Rajshahi" },
            pickup: "Techie Gadgets",
            payment: { total: 5400, advance: 2000, due: 3400 },
            partner: { image: "https://i.ibb.co.com/4xR6G1M/pathao.jpg", deliveryArea: "Rajshahi" },
            deliveryFee: { type: "prepaid", amount: 200 },
            note: "High demand item",
            status: "processing",
        },
    ];

    // Filter pre-orders by status
    const filteredPreOrders =
        filteredStatus === "all"
            ? preOrders
            : preOrders.filter((order) => order.status === filteredStatus);

    // Table Headers
    const headers = [
        {
            title: "Invoice No",
            dataIndex: "invoice",
            key: "invoice",
            render: (invoice, record) => (
                <>
                    <div className="flex justify-center items-center gap-1">
                        <CopyToClipboard value={invoice} />
                        <div id={`preorder-print-${record.key}`} className="hidden">
                            <PreOrderInvoice order={record} />
                        </div>
                        <Print value={`preorder-print-${record.key}`} />
                        <Link to={`/pre-orders/manage/${"1"}`}><EditIcon /></Link>
                    </div>
                    <Link to={`/pre-orders/${record.key}`} className="py-1">{invoice}</Link>
                    <div>
                        <Tag color="purple">Pre-Order</Tag>
                    </div>
                </>
            ),
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (date) => (
                <div>
                    <p>Created: {date?.created}</p>
                    <p>Expected: {date?.expected}</p>
                </div>
            ),
        },
        {
            title: "Customer",
            dataIndex: "customer",
            key: "customer",
            render: (customer) => (
                <div className="space-y-0.5">
                    <p className="text-primary font-semibold">{customer?.name}</p>
                    <div className="flex justify-center items-center">
                        <Tag color="cyan">Returning</Tag>
                        <button><ViewIcon /></button>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                        <span>{customer?.mobile}</span>
                        <CopyToClipboard value={customer?.mobile} />
                        <button><WhatsappIcon /></button>
                    </div>
                    <p>{customer?.address}</p>
                </div>
            ),
        },
        {
            title: "Pickup Address",
            dataIndex: "pickup",
            key: "pickup",
            render: (pickup) => (
                <>
                    <Tag color="green">Pre-Order Hub</Tag>
                    <p className="pt-1">{pickup}</p>
                </>
            ),
        },
        {
            title: "Payment Info",
            dataIndex: "payment",
            key: "payment",
            render: (payment) => (
                <>
                    <p>Total: {payment?.total}</p>
                    <p>Advance: {payment?.advance}</p>
                    <p>Due: {payment?.due}</p>
                </>
            ),
        },
        {
            title: "Delivery Partner",
            dataIndex: "partner",
            key: "partner",
            render: (delivery) => (
                <>
                    <img src={delivery?.image} className="w-full max-h-8 object-contain" alt="delivery partner image" />
                    <p>Area: {delivery?.deliveryArea}</p>
                </>
            ),
        },
        {
            title: "Delivery Fee",
            dataIndex: "deliveryFee",
            key: "deliveryFee",
            render: (deliveryFee) => (
                <>
                    <p>BDT {deliveryFee?.amount}</p>
                    <Tag color="blue" className="capitalize !mt-1">{deliveryFee?.type}</Tag>
                </>
            ),
        },
        { title: "Note", dataIndex: "note", key: "note" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const colors = {
                    pending: "orange",
                    on_hold: "gold",
                    confirmed: "green",
                    processing: "blue",
                    cancelled: "volcano",
                };
                return (
                    <Tag color={colors[status]} className="capitalize">
                        {status.replaceAll("_", " ")}
                    </Tag>
                );
            },
        },
    ];

    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="title">Pre Orders</h2>
                <Link to={"/pre-orders/manage"} className="button">Create Pre-Order</Link>
            </div>

            {/* Table */}
            <div className="mt-6">
                <Table
                    headers={headers}
                    data={filteredPreOrders}
                    onSelectRows={(rows) => console.log("Selected PreOrders:", rows)}
                />
            </div>
        </>
    );
};

export default AllPreOrders;
