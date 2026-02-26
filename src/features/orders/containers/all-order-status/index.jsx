import React, { useState } from "react";
import { Tag } from "antd";
import Table from "../../../../components/reusable/table";
import SectionLoading from "../../../../components/reusable/ui/section-loading";
import { DeleteButton, EditButton } from "../../../../components/reusable/ui/action-btns";
import toast from "react-hot-toast";
import StatusManageModal from "../../components/status-manage-modal";
import { useDeleteOrderStatus, useGetAllOrderStatus } from "../../services/orderStatusApi";


const AllOrderStatus = () => {

    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const { data, isLoading } = useGetAllOrderStatus();
    const deleteMutation = useDeleteOrderStatus();


    const headers = [
        { title: "Name", dataIndex: "name", key: "name" },
        {
            title: "Color", dataIndex: "color", key: "color", render: (color) =>
                <>
                    {
                        color ?
                            <div className="flex justify-center items-center gap-2">
                                <span className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: color }}
                                ></span>
                                <span className="opacity-80">
                                    {color}
                                </span>
                            </div>
                            :
                            <p>___</p>
                    }
                </>
        },
        {
            title: "Send Notification", dataIndex: "send_notification", key: "send_notification", render: (send_notification) =>
                <div>
                    {send_notification == 1 ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}
                </div>
        },
        {
            title: "Internal Notes", dataIndex: "internal_notes", key: "internal_notes", render: (internal_notes) =>
                <div className="flex flex-col items-center gap-2">
                    {internal_notes?.map(note =>
                        <Tag key={note?.id}>{note?.content}</Tag>
                    )}
                </div>
        },
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
                    <DeleteButton onClick={() => handleStatusDelete(record?.id)} />
                </div>
            ),
        },
    ];

    // status delete fn
    const handleStatusDelete = (id) => {
        window.confirm("Are you sure you want to delete this status?") &&
            deleteMutation.mutate(id, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Deleted");
                },
                onError: (err) => {
                    toast.success(err?.response?.data?.message || "Failed");
                }
            });
    };


    return (
        <div className="space-y-5">

            <div className="flex justify-between items-center">
                <h2 className="section-title">All Order Status</h2>
                <button className="button" onClick={() => { setEditData(null); setOpen(true); }}>
                    + Add Status
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
                        enableSearch={false}
                    />
            }

            {/* Status Add/Edit Modal */}
            <StatusManageModal
                open={open}
                setOpen={setOpen}
                editData={editData}
                setEditData={setEditData}
            />
        </div>
    );
};

export default AllOrderStatus;
