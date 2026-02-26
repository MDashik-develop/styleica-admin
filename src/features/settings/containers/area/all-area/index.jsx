import React, { useMemo, useState } from "react";
import Table from "../../../../../components/reusable/table";
import { useDeleteArea, useGetAllArea } from "../../../services/area";
import { DeleteButton, EditButton } from "../../../../../components/reusable/ui/action-btns";
import ManageAreaModal from "../manage-area-modal";
import toast from "react-hot-toast";


const AllArea = () => {

    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const { data, isLoading } = useGetAllArea({ search: searchQuery });
    const deleteAreaMutation = useDeleteArea();


    const headers = [
        {
            title: "District",
            key: "district_name",
            render: (row) =>
                <div>
                    <p>{row.district_name}</p>
                    <p>{row.bn_name}</p>
                </div>
        },
        {
            title: "Thana",
            key: "thanas",
            render: (row) =>
                <div className="max-w-60 text-left">
                    {row?.thanas?.map((thana, idx) =>
                        <p key={thana?.id || idx}>
                            {idx + 1}. {thana.thana_name} - {thana?.bn_name}
                        </p>
                    )}
                </div>
        },
        {
            title: "Actions",
            key: "actions",
            render: (row) => (
                <div className="flex justify-center items-center gap-2">
                    <EditButton
                        onClick={() => {
                            setEditData(row);
                            setOpen(true);
                        }}
                    />
                    <DeleteButton onClick={() => handleDeleteArea(row?.id)} />
                </div>
            ),
        },
    ];


    // delete fn
    const handleDeleteArea = (id) => {

        const confirmed = window.confirm("Are you sure you?");

        if (!confirmed) return;

        deleteAreaMutation.mutate(id, {
            onSuccess: (res) => {
                toast.success(res?.message || "Area deleted successfully");
            },
            onError: (err) => {
                toast.error(err?.response?.data?.message || "Failed to delete area");
            },
        });
    };



    return (
        <div>

            <div className="flex justify-between items-center gap-3 pb-3">
                <h2 className="title">
                    All Areas
                </h2>
                <button
                    onClick={() => {
                        setEditData(null);
                        setOpen(true);
                    }} className="button">
                    + Add New Area
                </button>
            </div>

            <ManageAreaModal
                open={open}
                setOpen={setOpen}
                editData={editData}
                setEditData={setEditData}
            />

            <Table
                headers={headers}
                loading={isLoading}
                data={data}
                enableFilters={true}
                onSearchChange={(value) => setSearchQuery(value)}
                searchPlaceholder="Search district or thana..."
            />
        </div>
    );
};

export default AllArea;