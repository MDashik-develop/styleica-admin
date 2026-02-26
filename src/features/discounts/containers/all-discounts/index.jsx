import React, { useState } from "react";
import { Tag } from "antd";
import Table from "../../../../components/reusable/table";
import { EditIcon } from "../../../../components/reusable/ui/common-icons";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";
import DiscountFilter from "../../components/all-discounts/filter";
import DiscountManageModal from "../../components/discount-manage-modal";


const AllDiscounts = () => {

    const [filteredStatus, setFilteredStatus] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);



    const discounts = [
        {
            key: 1,
            code: "NEW2025",
            type: "percentage",
            value: 15,
            minPurchase: 500,
            limit: 100,
            used: 25,
            start: "01 Nov, 2025",
            end: "30 Nov, 2025",
            status: "active",
        },
        {
            key: 2,
            code: "FLAT100",
            type: "flat",
            value: 100,
            minPurchase: 0,
            limit: 50,
            used: 50,
            start: "05 Oct, 2025",
            end: "10 Oct, 2025",
            status: "expired",
        },
        {
            key: 3,
            code: "FESTIVE50",
            type: "percentage",
            value: 50,
            minPurchase: 1000,
            limit: 200,
            used: 80,
            start: "01 Dec, 2025",
            end: "31 Dec, 2025",
            status: "upcoming",
        },
        {
            key: 4,
            code: "SHIPFREE",
            type: "free_shipping",
            value: 0,
            minPurchase: 300,
            limit: 999,
            used: 312,
            start: "20 Oct, 2025",
            end: "20 Jan, 2026",
            status: "active",
        },
    ];

    // Filter logic
    const filteredDiscounts =
        filteredStatus === "all"
            ? discounts
            : discounts.filter((item) => item.status === filteredStatus);

    // table headers...
    const headers = [
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
            render: (code, record) => (
                <div>
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <p
                            to={`/discounts/${record.key}`}
                            className="text-primary font-semibold"
                        >
                            {code}
                        </p>
                        <div className="flex justify-center items-center gap-2">
                            <CopyToClipboard value={code} />
                            <button
                                onClick={() => {
                                    setEditData(record);
                                    setShowModal(true);
                                }}
                            >
                                <EditIcon />
                            </button>
                        </div>
                    </div>

                    <Tag color="purple">Discount</Tag>
                </div>
            ),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (type, record) => {
                const colors = {
                    percentage: "blue",
                    flat: "green",
                    free_shipping: "cyan",
                };
                return (
                    <div>
                        <Tag color={colors[type]} className="capitalize">{type.replace("_", " ")}</Tag>
                        <p className="mt-1 font-semibold">
                            {type === "percentage" && `${record.value}%`}
                            {type === "flat" && `BDT ${record.value}`}
                            {type === "free_shipping" && "Free Shipping"}
                        </p>
                    </div>
                );
            },
        },
        {
            title: "Usage Info",
            key: "usage",
            render: (_, record) => (
                <div className="space-y-1">
                    <p>Limit: {record.limit}</p>
                    <p>Used: {record.used}</p>
                    <Tag color="cyan">{record.limit - record.used} Left</Tag>
                </div>
            ),
        },
        {
            title: "Rules",
            key: "rules",
            render: (_, record) => (
                <div>
                    <p>Min Purchase: BDT {record.minPurchase}</p>
                </div>
            ),
        },
        {
            title: "Validity",
            key: "date",
            render: (_, record) => (
                <div>
                    <p>Start: {record.start}</p>
                    <p>End: {record.end}</p>
                </div>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const colors = {
                    active: "green",
                    expired: "volcano",
                    upcoming: "blue",
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
            <div className="flex justify-between items-center">
                <h2 className="title">Discounts</h2>
                <button
                    className="button"
                    onClick={() => {
                        setEditData(null);
                        setShowModal(true);
                    }}
                >
                    Create Discount
                </button>

            </div>

            {/* FILTER COMPONENT */}
            <DiscountFilter
                value={filteredStatus}
                onChange={(status) => setFilteredStatus(status)}
            />

            {/* Table */}
            <div className="mt-8">
                <Table
                    tableName="All Discounts"
                    headers={headers}
                    data={filteredDiscounts}
                    onSelectRows={(rows) => console.log("Selected Discounts:", rows)}
                />
            </div>

            <DiscountManageModal
                isEdit={!!editData}
                discountData={editData}
                openModal={showModal}
                onClose={() => setShowModal(false)}
            />

        </>
    );
};

export default AllDiscounts;
