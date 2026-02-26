import React, { useEffect, useState } from "react";
import Table from "../../../../components/reusable/table";
import { Tag } from "antd";
import { DeleteIcon, EditIcon } from "../../../../components/reusable/ui/common-icons";
import RoleManageModal from "../../components/roles/role-manage-modal";
import { useAllRoles, useCreateRole, useDeleteRole, useUpdateRole } from "../../services/rolePermissionApi";
import toast from "react-hot-toast";
import SectionLoading from "../../../../components/reusable/ui/section-loading";


const Roles = () => {

    const [openModal, setOpenModal] = useState(false);
    const [editRole, setEditRole] = useState(null);
    const { data: roles, isLoading } = useAllRoles();
    const [loading, setLoading] = useState(false)
    const createRoleMutation = useCreateRole();
    const updateRoleMutation = useUpdateRole();
    const deleteRoleMutation = useDeleteRole();

    // Sync loading with initial fetch
    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    const headers = [
        { title: "Role Name", dataIndex: "name", key: "display_name", width: 150 },
        {
            title: "Role Permissions",
            dataIndex: "permissions",
            key: "permissions",
            render: (permissions) => (
                <div className="text-xs lg:text-base !space-x-1">
                    {permissions?.map(item =>
                        <Tag key={item?.id} color="blue">{item?.display_name}</Tag>
                    )}
                </div>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div className="flex items-center gap-5 px-4">
                    <button
                        onClick={() => {
                            setEditRole(record);
                            setOpenModal(true);
                        }}
                    >
                        <EditIcon className="!text-xl" />
                    </button>
                    <button onClick={() => handleDeleteRole(record)}>
                        <DeleteIcon />
                    </button>
                </div>
            ),
        },
    ];

    // add / edit role fn
    const handleSaveRole = (role) => {

        setLoading(true);

        const payload = {
            name: role?.name,
            display_name: role?.name,
            guard_name: role?.name,
            permission_ids: role?.permissions
        };

        // console.log("payload", payload);

        if (editRole) {
            // Edit role
            const updatedPayload = {
                id: editRole?.id,
                ...payload,
            };
            console.log("payload for update:", updatedPayload);

            updateRoleMutation.mutate(updatedPayload, {
                onSuccess: (res) => {
                    console.log("API response:", res);

                    setLoading(false);
                    // toast.success(res?.message || "Role Updated!");
                    setOpenModal(false);
                    setEditRole(null);
                },
                onError: (err) => {
                    console.log("error response:", err);
                    setLoading(false);
                    toast.error(err?.response?.data?.message || "Update Failed!");
                }
            });
        } else {
            createRoleMutation.mutate(payload, {
                onSuccess: (res) => {
                    // toast.success(res?.message || "Role Added!");
                    setLoading(false);
                    setOpenModal(false);
                },
                onError: (err) => {
                    setLoading(false);
                    toast.error(err?.message || "Faild!");
                }
            });
        }
    };

    // role delete fn
    const handleDeleteRole = (role) => {

        setLoading(true);

        if (!role?.id) return;

        deleteRoleMutation.mutate(role.id, {
            onSuccess: (res) => {
                setLoading(false);
            },
            onError: (err) => {
                setLoading(false);
                toast.error(err?.message || "Failed to delete role!");
            }
        });
    };


    return (
        <div>
            <div className="flex justify-between items-center gap-3 pb-6">
                <h2 className="title !pb-0">Roles</h2>
                <button
                    onClick={() => { setEditRole(null); setOpenModal(true); }}
                    className="button"
                >
                    Add New Role
                </button>
            </div>

            {
                loading ?
                    <SectionLoading />
                    :
                    <div className="card">
                        <Table
                            headers={headers}
                            data={roles}
                            pagination={false}
                            enableSelection={false}
                        />
                    </div>
            }

            <RoleManageModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                onSave={handleSaveRole}
                editRole={editRole}
            />
        </div>
    );
};

export default Roles;
