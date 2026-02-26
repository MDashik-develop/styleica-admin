import React, { useState } from "react";
import Table from "../../../../components/reusable/table";
import { Tag } from "antd";
import CourierManageModal from "../../components/courier-manage-modal";
import { useGetAllCouriers, useUpdateCourier } from "../../services/courierApi";
import Pagination from "../../../../components/reusable/pagination";
import toast from "react-hot-toast";
import { EditButton } from "../../../../components/reusable/ui/action-btns";


const AllCourier = () => {

    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllCouriers(currentPage);
    const [editData, setEditData] = useState(null);
    const updateCurier = useUpdateCourier();

    const updateLoading = updateCurier.isLoading || updateCurier.isPending;

    const headers = [
        {
            title: "Logo",
            dataIndex: "media_url",
            key: "media_url", render: (_, record) =>
                <div>
                    {
                        record?.media_url ? <img src={record?.media_url} alt="logo" className="w-12 h-12 object-contain mx-auto" />
                            :
                            <span className="text-gray-400 text-sm">N/A</span>
                    }
                </div>
        },
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
            render: (_, record) => (
                <p className="font-semibold text-center">{record?.name}</p>
            ),
        },

        {
            title: "COD Percent",
            dataIndex: "cod_percent",
            key: "cod_percent",
        },
        {
            title: "Charges",
            dataIndex: "inside_charge",
            key: "inside_charge", render: (_, record) =>
                <div>
                    <p>Inside: {record?.inside_charge}</p>
                    <p>Outside: {record?.outside_charge}</p>
                </div>
        },
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Extra Info",
            dataIndex: "extra",
            key: "extra",
            render: (extra) => {
                let items = [];

                try {
                    const parsed =
                        typeof extra === "string" ? JSON.parse(extra) : extra;

                    // If array → use directly
                    if (Array.isArray(parsed)) {
                        items = parsed;
                    }
                    // If object → convert to key/value array
                    else if (parsed && typeof parsed === "object") {
                        items = Object.entries(parsed).map(([key, value]) => ({
                            key,
                            value:
                                value !== null && value !== undefined
                                    ? String(value)
                                    : "",
                        }));
                    }
                } catch (e) {
                    items = [];
                }

                if (!items.length) {
                    return <span className="text-gray-400 text-xs">N/A</span>;
                }

                return (
                    <div className="flex flex-col justify-center gap-1 capitalize md:px-3">
                        {items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                                <span className="text-xs font-medium">
                                    {item.key}:
                                </span>
                                <Tag color="blue" className="text-[10px]">
                                    {item.value}
                                </Tag>
                            </div>
                        ))}
                    </div>
                );
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status == 1 ? "green" : "volcano"} className="capitalize">
                    {status == 1 ? "Active" : "Inactive"}
                </Tag>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <EditButton onClick={() => {
                    setEditData(record);
                    setOpen(true);
                }}
                />
            ),
        },
    ];


    // courier update fn
    const handleCurierUpdate = (payload) => {
        updateCurier.mutate(
            { id: editData.id, payload },
            {
                onSuccess: (res) => {
                    toast.success(res?.message || "Updated")
                    setOpen(false);
                    setEditData(null);
                },
            },
            {
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed to update");
                },
            },
        );
    };

    // console.log(data?.data);


    return (
        <>
            {/* Header */}
            <h2 className="title">Couriers</h2>

            {/* Table */}
            <Table
                loading={isLoading}
                headers={headers}
                data={data?.data}
                enableSearch={false}
            />
            <Pagination
                paginationMeta={data}
                onPaginationChange={(page) => setCurrentPage(page)}
            />

            {/* Courier Modal for Add/Edit */}
            <CourierManageModal
                open={open}
                setOpen={setOpen}
                editData={editData}
                setEditData={setEditData}
                onSubmit={handleCurierUpdate}
                loading={updateLoading}
            />
        </>
    );
};

export default AllCourier;
