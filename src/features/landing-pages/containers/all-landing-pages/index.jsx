import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import toast from "react-hot-toast";
import Table from "../../../../components/reusable/table";
import Pagination from "../../../../components/reusable/pagination";
import ImagePreview from "../../../../components/reusable/ui/image-preview";
import { DeleteButton, DuplicateButton, EditButton, ViewButton } from "../../../../components/reusable/ui/action-btns";
import { useGetAllLandingPages, useDeleteLandingPage, useDuplicateLandingPage, useUpdateLandingPageStatus } from "../../services/landingPagesApi";
import FormInput from "../../../../components/reusable/form-input";


const AllLandingPages = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllLandingPages({ page: currentPage });
    const deleteLandingPage = useDeleteLandingPage();
    const duplicateLandingPage = useDuplicateLandingPage();
    const updateLandingPageStatus = useUpdateLandingPageStatus();


    const headers = [
        {
            title: "Basic Info",
            key: "titles",
            render: (row) => (
                <div className="min-w-[180px] max-w-[220px] text-left space-y-1">
                    <p>
                        <span className="font-bold mr-1 opacity-70">Main Title:</span>
                        <span>{row.main_title}</span>
                    </p>
                    <p>
                        <span className="font-bold mr-1 opacity-70">Sub-Title:</span>
                        <span>{row.sub_title}</span>
                    </p>
                    <p>
                        <span className="font-bold mr-1 opacity-70">Short Description:</span>
                        <span>{row.short_description}</span>
                    </p>
                    <p>
                        <span className="font-bold mr-1 opacity-70">Contact:</span>
                        <span>{row.numbers?.[0]}</span>
                    </p>
                </div>
            ),
        },
        {
            title: "Media",
            key: "media",
            render: (row) => (
                <div className="space-y-2">
                    <div className="text-left">
                        <span className="text-xs uppercase font-bold text-gray-400 block pb-1">Hero</span>
                        <ImagePreview images={[row.hero_media]} initialWidth={"w-10 h-10 object-cover"} />
                    </div>
                    {row.size_chart_media?.length > 0 && (
                        <div className="text-left">
                            <span className="text-xs uppercase font-bold text-gray-400 block pb-1">Size Chart</span>
                            <ImagePreview images={row.size_chart_media} initialWidth={"w-10 h-10 object-cover"} />
                        </div>
                    )}
                    {row.gallery_media?.length > 0 && (
                        <div className="text-left space-x-2">
                            <span className="text-xs uppercase font-bold text-gray-400 block pb-1">Gallery</span>
                            {row.gallery_media.map((media, index) => (
                                <ImagePreview key={index} images={[media]} initialWidth={"w-10 h-10 object-cover"} />
                            ))}
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: "Slug & Config",
            key: "config",
            render: (row) => (
                <div className="space-y-2 text-left">
                    <p>
                        <span className="font-bold mr-1 opacity-70">Slug:</span>
                        <span>{row.page_slug}</span>
                    </p>
                    <p>
                        <span className="font-bold mr-1 opacity-70">GTM Key:</span>
                        <span>{row.gtm_key}</span>
                    </p>
                </div>
            ),
        },
        {
            title: "Products",
            key: "products",
            render: (row) => (
                <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto custom-scrollbar w-[250px]">
                    {row.products?.map((prod) => (
                        <div key={prod.id} className="flex items-center gap-2 bg-gray-50 p-1">
                            <ImagePreview key={prod.id} images={[prod.media]} initialWidth={"!w-8 !h-8 object-contain"} />
                            <span className="text-[11px] font-medium truncate">{prod.name}</span>
                        </div>
                    )) || <span className="text-gray-400 italic text-[10px]">No products</span>}
                </div>
            ),
        },
        {
            title: "Colors",
            key: "colors",
            render: (row) => (
                <div className="flex flex-col gap-2 min-w-[100px]">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-5 h-5 rounded border border-gray-200 shadow-sm flex-shrink-0"
                            style={{ backgroundColor: row.primary_color || 'transparent' }}
                        />
                        <span className="text-[11px] font-mono font-semibold text-gray-700 uppercase">
                            {row.primary_color || "N/A"}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-5 h-5 rounded border border-gray-200 shadow-sm flex-shrink-0"
                            style={{ backgroundColor: row.secondary_color || 'transparent' }}
                        />
                        <span className="text-[11px] font-mono font-semibold text-gray-700 uppercase">
                            {row.secondary_color || "N/A"}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            title: "Status",
            key: "status",
            render: (row) => (
                <div className="w-[110px]">
                    <FormInput
                        type="select"
                        options={[
                            { label: "Active", value: "active" },
                            { label: "Inactive", value: "inactive" }
                        ]}
                        value={row.status}
                        onChange={(e) => {
                            const newValue = e?.target ? e.target.value : e;
                            handleStatusChange(row.id, newValue);
                        }}
                        className={`!text-[11px] !py-1 !h-8 ${row.status === 'active' ? '!text-green-600 font-bold' : '!text-red-500 font-bold'
                            }`}
                    />
                </div>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (row) => (
                <div className="flex items-center gap-2">
                    <Link to={`https://shop.styleica.com/?slug=${row?.page_slug}`} target="_blank">
                        <ViewButton />
                    </Link>
                    <Link to={`/landing-pages/manage/${row.id}`}>
                        <EditButton />
                    </Link>
                    <DuplicateButton onClick={() => handleDuplicate(row?.id)} />
                    <DeleteButton onClick={() => handleDelete(row?.id)} />
                </div>
            ),
        },
    ];


    const handleStatusChange = (id, newStatus) => {
        updateLandingPageStatus.mutate({ id, status: newStatus }, {
            onSuccess: (res) => {
                toast.success(res?.message || `Status updated to ${newStatus}`);
            },
            onError: (err) => {
                toast.error(err?.response?.data?.message || "Failed to update status");
            }
        });
    };

    const handleDuplicate = (id) => {
        if (window.confirm("Are you sure you?")) {
            duplicateLandingPage.mutate(id, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Duplicated successfully!");
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed to duplicate!");
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you?")) {
            deleteLandingPage.mutate(id, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Deleted successfully!");
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed to delete!");
                },
            });
        }
    };


    return (
        <div>
            <div className="flex justify-between items-center gap-3 pb-5">
                <h2 className="text-xl font-bold text-gray-800">Landing Pages</h2>
                <Link to={"/landing-pages/manage"} className="button">
                    <FaPlus />
                    Add New
                </Link>
            </div>

            <Table
                headers={headers}
                loading={isLoading}
                data={data?.data}
                enableSearch={false}
            />

            <div className="mt-6">
                <Pagination
                    paginationMeta={data}
                    onPaginationChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default AllLandingPages;