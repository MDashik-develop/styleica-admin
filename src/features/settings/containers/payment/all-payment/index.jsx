import React, { useState } from "react";
import { Tag } from "antd";
import Table from "../../../../../components/reusable/table";
import SectionLoading from "../../../../../components/reusable/ui/section-loading";
import { DeleteButton, EditButton } from "../../../../../components/reusable/ui/action-btns";
import toast from "react-hot-toast";
import { useGetAllPayments } from "../../../services/paymentApi";
import PaymentManageModal from "../payment-manage-modal";


const AllPayment = () => {

    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const { data, isLoading } = useGetAllPayments();

    const headers = [
        { title: "Name", dataIndex: "name", key: "name" },
        {
            title: "Status", dataIndex: "is_active", key: "is_active", render: (is_active) =>
                <Tag color={is_active == 1 ? "green" : "red"}>{is_active == 1 ? "Yes" : "No"}</Tag>
        },
        {
            title: "Sandbox Mode", dataIndex: "sandbox_mode", key: "sandbox_mode", render: (sandbox_mode) =>
                <Tag color={sandbox_mode == 1 ? "green" : "red"}>{sandbox_mode == 1 ? "Active" : "Inactive"}</Tag>
        },
        { title: "Instructions", dataIndex: "instructions", key: "instructions" },
        { title: "Description", dataIndex: "description", key: "description" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex justify-center gap-5">
                    <EditButton
                        onClick={() => {
                            setEditData(record);
                            setOpen(true);
                        }}
                    />
                </div>
            ),
        },
    ];

    // console.log(data);


    return (
        <div className="space-y-5">

            <h2 className="section-title">Payment Method</h2>

            {/* Table */}
            <Table
                loading={isLoading}
                headers={headers}
                data={data}
                enableFilters={true}
                enableSearch={false}
            />

            {/* payment Add/Edit Modal */}
            <PaymentManageModal
                open={open}
                setOpen={setOpen}
                paymentData={editData}
            />
        </div>
    );
};

export default AllPayment;
