import React, { useState } from "react";
import { Tag } from "antd";
import Table from "../../../../../components/reusable/table";
import ManageBrand from "../manage-brand";
import { useDeleteBrand, useGetAllBrands } from "../../../services/brandApi";
import SectionLoading from "../../../../../components/reusable/ui/section-loading";
import { DeleteButton, EditButton } from "../../../../../components/reusable/ui/action-btns";
import Pagination from "../../../../../components/reusable/pagination";


const AllBrands = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllBrands(currentPage);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const deleteBrandMutation = useDeleteBrand();


    const headers = [
        {
            title: "Logo", dataIndex: "media", key: "media", render: (media) =>
                <img src={media?.urls?.small} className="w-10 h-10 object-contain" alt="image" />
        },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Slug", dataIndex: "slug", key: "slug" },
        { title: "Description", dataIndex: "description", key: "description" },
        { title: "Meta Title", dataIndex: "meta_title", key: "meta_title" },
        { title: "Meta Description", dataIndex: "meta_description", key: "meta_description" },
        { title: "Order", dataIndex: "sort_order", key: "sort_order" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status ? "green" : "volcano"}>{status ? "Active" : "Inactive"}</Tag>
            ),
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
                    <DeleteButton onClick={() => handleDeleteBrand(record?.id)} />
                </div>
            ),
        },
    ];


    // delete brand fn
    const handleDeleteBrand = (id) => {
        if (!id) return;

        if (window.confirm("Are you sure you want to delete this brand?")) {
            deleteBrandMutation.mutate(id, {
                onSuccess: (res) => {
                    toast.success("Deleted Successfully!");
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed to delete brand");
                },
            });
        }
    };


    return (
        <div className="space-y-5">

            <div className="flex justify-between items-center">
                <h2 className="section-title">All Brands</h2>
                <button className="button" onClick={() => { setEditData(null); setOpen(true); }}>
                    + Add Brand
                </button>
            </div>

            {/* Table */}
            {
                isLoading ?
                    <SectionLoading />
                    :
                    <>
                        <Table
                            headers={headers}
                            data={data?.data}
                            enableFilters={true}
                        />
                        <Pagination
                            paginationMeta={data}
                            onPaginationChange={(page) => setCurrentPage(page)}
                        />
                    </>
            }

            {/* Brand Add/Edit Modal */}
            <ManageBrand
                open={open}
                setOpen={setOpen}
                editData={editData}
                setEditData={setEditData}
            />
        </div>
    );
};

export default AllBrands;
