import React, { useState } from "react";
import { Tag } from "antd";
import Table from "../../../../../components/reusable/table";
import ManageCategory from "../manage-category";
import { useDeleteCategory, useGetAllCategory } from "../../../services/categoryApi";
import SectionLoading from "../../../../../components/reusable/ui/section-loading";
import toast from "react-hot-toast";
import { DeleteButton, EditButton } from "../../../../../components/reusable/ui/action-btns";
import Pagination from "../../../../../components/reusable/pagination";

// Recursively flatten categories for table and dropdown
const flattenCategories = (categories, level = 0, parentPath = "") => {
    let result = [];
    categories.forEach((cat) => {
        result.push({ ...cat, level, parentPath });
        if (cat.child?.length) {
            result = result.concat(flattenCategories(cat.child, level + 1, parentPath ? `${parentPath} > ${cat.name}` : cat.name));
        }
    });
    return result;
};

// Get all descendant IDs (to prevent selecting them as parent)
const getDescendantIds = (category) => {
    let ids = [];
    if (category.child?.length) {
        category.child.forEach((c) => {
            ids.push(c.id);
            ids = ids.concat(getDescendantIds(c));
        });
    }
    return ids;
};


const AllCategories = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, refetch } = useGetAllCategory({ page: currentPage, pagination: null });
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const deleteCategory = useDeleteCategory();


    // Flatten categories for table and modal dropdown
    const tableData = flattenCategories(data?.data || []);

    const headers = [
        // { title: "ID", dataIndex: "id", key: "id", render: (id) => <span>{id}</span> },
        {
            title: "Image",
            dataIndex: "media",
            key: "media",
            render: (media) =>
                media ? <img src={media?.urls?.small} className="w-8 h-8 mx-auto object-cover" alt="category" /> : "---",
        },
        {
            title: "Category Name",
            dataIndex: "name",
            key: "name",
            render: (name, record) => (
                <div style={{ paddingLeft: `${record.level * 20}px` }}>
                    {record.level > 0 && <span className="mr-1">↳</span>}
                    {name}
                </div>
            ),
        },
        {
            title: "Full Path",
            dataIndex: "parentPath",
            key: "parentPath",
            render: (path) => <span className="text-sm">{path}</span>,
        },
        { title: "Meta Title", dataIndex: "meta_title", key: "meta_title" },
        { title: "Meta Description", dataIndex: "meta_description", key: "meta_description" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => <Tag color={status ? "green" : "volcano"}>{status ? "Active" : "Inactive"}</Tag>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex justify-center gap-3">
                    <EditButton
                        onClick={() => {
                            setEditData(record); // works for parent or subcategory
                            setOpen(true);
                        }}
                    />
                    <DeleteButton onClick={() => handleDeleteCategory(record.id)} />
                </div>
            ),
        },
    ];

    // Delete category handler
    const handleDeleteCategory = (id) => {
        deleteCategory.mutate(id, {
            onSuccess: (res) => {
                toast.success(res?.message || "Deleted");
                refetch();
            },
            onError: (err) => toast.error(err?.response?.data?.message || "Failed to delete category"),
        });
    };


    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="section-title">All Categories</h2>
                <button
                    className="button"
                    onClick={() => {
                        setEditData(null);
                        setOpen(true);
                    }}
                >
                    + Add Category
                </button>
            </div>

            {/* Table */}
            <>
                <Table
                    loading={isLoading}
                    headers={headers}
                    showIndex={true}
                    data={tableData}
                    enableFilters={true}
                    enableSearch={false}
                />
                <Pagination
                    paginationMeta={data}
                    onPaginationChange={(page) => setCurrentPage(page)}
                />
            </>

            {/* Add/Edit Modal */}
            <ManageCategory
                open={open}
                setOpen={setOpen}
                editData={editData}
                setEditData={setEditData}
                allCategory={tableData}
            // refetch={refetch}
            />
        </div>
    );
};

export default AllCategories;
