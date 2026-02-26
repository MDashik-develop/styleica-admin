import React, { useState } from "react";
import { FaUserPlus, FaEdit, FaTrash, FaUserShield } from "react-icons/fa";
import Table from "../../../../components/reusable/table";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";
import { Link } from "react-router-dom";
import UserManageModal from "../../components/user-manage-modal";
import { useCreateUser, useDeleteUser, useGetAllUsers, useUpdateUser } from "../../services/usersApi";
import { DeleteButton, EditButton } from "../../../../components/reusable/ui/action-btns";
import { Tag } from "antd";
import toast from "react-hot-toast";
import Pagination from "../../../../components/reusable/pagination";


const AllUsers = () => {

    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const createUserMutation = useCreateUser();
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllUsers(currentPage);
    const updateUserMutation = useUpdateUser();
    const deleteUserMutation = useDeleteUser();

    const btnLoading = createUserMutation.isLoading || createUserMutation.isPending || updateUserMutation.isLoading || updateUserMutation.isPending;

    const headers = [
        {
            title: "Image",
            key: "media_id",
            dataIndex: "media_id",
            render: (_, record) => (
                <>
                    {record?.media ? (
                        <img
                            src={record?.media?.urls?.small}
                            alt="User"
                            className="w-10 h-10 mx-auto"
                        />
                    ) : (
                        <span>N/A</span>
                    )}
                </>
            )
        },
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
            render: (value, record) => (
                <Link
                    to={`/users/${record?.id}`}
                    className="flex justify-start"
                >
                    {value}
                </Link>
            )
        },
        {
            title: "Contact",
            key: "id",
            dataIndex: "id",
            render: (id, record) => (
                <>
                    {
                        record?.phone &&
                        <div className="flex justify-center items-center gap-2">
                            <Link to={`tel:${record?.phone}`} className="hover:underline !text-dark">
                                {record?.phone}
                            </Link>
                            <CopyToClipboard value={record?.phone} />
                        </div>
                    }
                    <div className="flex justify-center items-center gap-2">
                        <Link to={`mailto:${record?.email}`} className="hover:underline !text-dark" target="_blank"
                            rel="noopener noreferrer">
                            {record?.email}
                        </Link>
                        <CopyToClipboard value={record?.email} />
                    </div>
                </>
            )
        },
        {
            title: "Role",
            key: "roles",
            dataIndex: "roles",
            render: (id, record) => (
                <span className="px-3 py-1 text-xs rounded bg-blue-100 text-blue-700">
                    {record?.roles[0]?.name}
                </span>
            )
        },
        {
            title: "Last Login",
            key: "last_login_at",
            dataIndex: "last_login_at"
        },
        {
            title: "Last Login IP",
            key: "last_login_ip",
            dataIndex: "last_login_ip"
        },
        {
            title: "Status",
            key: "active",
            dataIndex: "active",
            render: (value) => (
                <Tag color={value ? "green" : "volcano"}>
                    {value ? "Active" : "Inactive"}
                </Tag>
            )
        },
        {
            title: "Actions",
            render: (_, record) => (
                <div className="flex justify-center gap-3">
                    <EditButton
                        onClick={() => {
                            setEditData(record);
                            setOpenModal(true);
                        }}
                    />

                    <DeleteButton onClick={() => handleDeleteUser(record.id)} />
                </div>
            )
        }
    ];


    // add / edit fn
    const handleSave = (payload) => {

        const updatePayload = { user_id: editData?.id, ...payload };

        if (editData) {
            updateUserMutation.mutate(updatePayload,
                {
                    onSuccess: (res) => {
                        toast.success(res?.message || "Updated");
                        setOpenModal(false);
                    },
                    onError: (err) => {
                        toast.error(err?.response?.data?.message || "Failed to update");
                    }
                }
            );
        } else {
            createUserMutation.mutate(payload, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Created");
                    setOpenModal(false);
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed to create");
                }
            });
        }
    };

    // delete user fn
    const handleDeleteUser = (user_id) => {
        if (window.confirm("Are you sure you?")) {
            deleteUserMutation.mutate(user_id, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Deleted")
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed!")
                },
            });
        }
    };


    // console.log(data?.data);


    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="title !pb-0">Business Users</h2>

                <button
                    className="button flex items-center gap-2"
                    onClick={() => {
                        setEditData(null);
                        setOpenModal(true);
                    }}
                >
                    <FaUserPlus /> Add User
                </button>
            </div>

            {/* Users Table */}
            <Table
                loading={isLoading}
                headers={headers}
                data={data?.data}
                showIndex={true}
                enableSearch={false}
            />
            <Pagination
                paginationMeta={data}
                onPaginationChange={(page) => setCurrentPage(page)}
            />

            {/* Manage Modal */}
            {openModal && (
                <UserManageModal
                    visible={openModal}
                    onClose={() => setOpenModal(false)}
                    isEdit={!!editData}
                    userData={editData}
                    onSave={handleSave}
                    loading={btnLoading}
                />
            )}

        </div>
    );
};

export default AllUsers;
