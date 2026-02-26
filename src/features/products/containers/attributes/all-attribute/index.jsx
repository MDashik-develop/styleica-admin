import React, { useState } from "react";
import { Tag } from "antd";
import Table from "../../../../../components/reusable/table";
import ManageAttribute from "../manage-attributes";
import { useDeleteAttribute, useGetAllAttributes } from "../../../services/attributeApi";
import SectionLoading from "../../../../../components/reusable/ui/section-loading";
import { DeleteButton, EditButton } from "../../../../../components/reusable/ui/action-btns";
import toast from "react-hot-toast";


const AllAttributes = () => {

    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const { data, isLoading } = useGetAllAttributes();
    const deleteMutation = useDeleteAttribute();

    const headers = [
        { title: "Attribute Name", dataIndex: "name", key: "name" },
        { title: "Type", dataIndex: "type", key: "type" },
        {
            title: "Values", dataIndex: "values", key: "values", render: (values) =>
                <div className="space-y-1">
                    {
                        values?.map(item => {
                            const colorCode = item?.color_code?.toLowerCase().trim();
                            const isWhite = colorCode === "white" || colorCode === "#fff" || colorCode === "#ffffff";
                            const darkTextColorClass = isWhite ? "text-gray-800" : "";

                            return <div key={item?.id} className="flex justify-center items-center gap-2">
                                <p>Value : <Tag color="blue">{item?.value}</Tag></p>
                                {item?.color_code &&
                                    <p>Color Code:
                                        <Tag color={item?.color_code || "cyan"}>
                                            <span className={darkTextColorClass}>
                                                {item?.color_code}
                                            </span>
                                        </Tag>
                                    </p>
                                }
                            </div>
                        })
                    }
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
                    <DeleteButton onClick={() => handleAttributeDelete(record?.id)} />
                </div>
            ),
        },
    ];

    // attribute delete fn
    const handleAttributeDelete = (id) => {
        deleteMutation.mutate(id, {
            onSuccess: (res) => {
                toast.success(res?.message || "Attribute Deleted");
            },
            onError: (err) => {
                toast.success(err?.response?.data?.message || "Failed");
            }
        });
    };


    return (
        <div className="space-y-5">

            <div className="flex justify-between items-center">
                <h2 className="section-title">All Attributes</h2>
                <button className="button" onClick={() => { setEditData(null); setOpen(true); }}>
                    + Add Attribute
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

            {/* Attribute Add/Edit Modal */}
            <ManageAttribute
                open={open}
                setOpen={setOpen}
                editData={editData}
                setEditData={setEditData}
            />
        </div>
    );
};

export default AllAttributes;
