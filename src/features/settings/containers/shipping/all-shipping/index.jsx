import React, { useState } from "react";
import { Tag } from "antd";
import Table from "../../../../../components/reusable/table";
import SectionLoading from "../../../../../components/reusable/ui/section-loading";
import { DeleteButton, EditButton } from "../../../../../components/reusable/ui/action-btns";
import toast from "react-hot-toast";
import ShippingManageModal from "../shipping-manage-modal";
import { useDeleteShipping, useGetAllShipping } from "../../../services/shippingApi";


const AllShipping = () => {

    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const { data, isLoading } = useGetAllShipping();
    const deleteMutation = useDeleteShipping();

    const headers = [
        { title: "Name", dataIndex: "name", key: "name" },
        {
            title: "Charges", dataIndex: "base_charge", key: "base_charge", render: (_, record) =>
                <div className="space-y-1">
                    <p>Base: {record?.base_charge ? record?.base_charge : "___"}</p>
                    <p>Per KG: {record?.per_kg_charge ? record?.per_kg_charge : "___"}</p>
                </div>
        },
        {
            title: "COD", dataIndex: "cod_available", key: "cod_available", render: (cod) =>
                <Tag color={cod == 1 ? "green" : "red"}>{cod == 1 ? "Yes" : "No"}</Tag>
        },
        {
            title: "Status", dataIndex: "status", key: "status", render: (status) =>
                <Tag color={status == 1 ? "green" : "red"}>{status == 1 ? "Active" : "Inactive"}</Tag>
        },
        { title: "Delivery Time", dataIndex: "delivery_time", key: "delivery_time" },
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
                    <DeleteButton onClick={() => handleShippingDelete(record?.id)} />
                </div>
            ),
        },
    ];

    // shipping delete fn
    const handleShippingDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you?");
        if (!confirmDelete) return;

        deleteMutation.mutate(id, {
            onSuccess: (res) => {
                toast.success(res?.message || "Deleted");
            },
            onError: (err) => {
                toast.error(err?.response?.data?.message || "Failed");
            }
        });
    };



    return (
        <div className="space-y-5">

            <div className="flex justify-between items-center">
                <h2 className="section-title">Shipping Method</h2>
                <button className="button" onClick={() => { setEditData(null); setOpen(true); }}>
                    + Add Shipping Method
                </button>
            </div>

            {/* Table */}
            {
                isLoading ?
                    <SectionLoading />
                    :
                    <Table
                        headers={headers}
                        data={data}
                        enableFilters={true}
                    />
            }

            {/* Shipping Add/Edit Modal */}
            <ShippingManageModal
                open={open}
                setOpen={setOpen}
                editData={editData}
                setEditData={setEditData}
            />
        </div>
    );
};

export default AllShipping;
