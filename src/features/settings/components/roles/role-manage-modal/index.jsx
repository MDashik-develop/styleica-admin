import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import FormInput from "../../../../../components/reusable/form-input";
import { usePermissions } from "../../../services/rolePermissionApi";
import { MdDoubleArrow } from "react-icons/md";


const RoleManageModal = ({ openModal, setOpenModal, onSave, editRole }) => {

    const [formData, setFormData] = useState({ name: "", permissions: [] });
    const [allSelected, setAllSelected] = useState(false);
    const { data: permissionsData, isLoading } = usePermissions();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (editRole) {
            setFormData({
                name: editRole.display_name || "",
                permissions: editRole.permissions?.map(p => p.id) || [],
            });

            // Check if role has the "All permissions" permission
            const allPerm = editRole.permissions?.find(
                p => p.display_name === "All permissions"
            );

            if (allPerm) {
                setFormData({
                    name: editRole.display_name || "",
                    permissions: [allPerm.id],
                });
                setAllSelected(true);
            } else {
                setFormData({
                    name: editRole.display_name || "",
                    permissions: editRole.permissions?.map(p => p.id) || [],
                });
                setAllSelected(false);
            }
        } else {
            setFormData({ name: "", permissions: [] });
            setAllSelected(false);
        }
    }, [editRole, permissionsData]);

    // Handle value change
    const handleChange = (e) => {
        setErrorMessage("");
        setFormData(prev => ({ ...prev, name: e.target.value }));
    };

    // All Permission toggle
    const handleAllPermission = () => {
        setErrorMessage("");
        const totalPermissions = Object.values(permissionsData || {}).flat();

        if (!allSelected) {
            const allPerm = totalPermissions.find(p => p.display_name === "All permissions");
            if (allPerm) {
                setFormData(prev => ({
                    ...prev,
                    permissions: [allPerm.id]
                }));
            }
        } else {
            // Unselect all
            setFormData(prev => ({ ...prev, permissions: [] }));
        }
        setAllSelected(!allSelected);
    };

    const handlePermissionChange = (permId) => {
        setErrorMessage("");

        if (allSelected) setAllSelected(false);

        setFormData(prev => ({
            ...prev,
            permissions: prev.permissions.includes(permId)
                ? prev.permissions.filter(p => p !== permId)
                : [...prev.permissions, permId]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setErrorMessage("Role name is required");
            return;
        }
        onSave(editRole ? { ...editRole, ...formData } : formData);
    };


    // console.log("edit role:", editRole);

    return (
        <Modal
            title={editRole ? "Edit Role" : "Add New Role"}
            centered
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={null}
        >
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Role Name"
                    name="name"
                    placeholder="Enter role name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <div className="mt-4">
                    <label className="font-semibold mb-2 block">Select Permissions:</label>

                    {isLoading ? (
                        <p>Loading permissions...</p>
                    ) : (
                        Object.keys(permissionsData || {}).map(category => {

                            if (category === "*") {
                                return (
                                    <button type="button" key="all-permission">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={allSelected}
                                                onChange={handleAllPermission}
                                            />
                                            <span className="text-sm">All Permission</span>
                                        </label>
                                    </button>
                                );
                            }

                            const perms = permissionsData[category];

                            return (
                                <div key={category} className="my-3">
                                    <h4 className="bg-slate-200 p-1 flex items-center gap-1 mb-1">
                                        <MdDoubleArrow /> {category}
                                    </h4>

                                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto custom-scrollbar">
                                        {perms.map(perm => (
                                            <label key={perm.id} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    disabled={allSelected}
                                                    checked={formData.permissions.includes(perm.id)}
                                                    onChange={() => handlePermissionChange(perm.id)}
                                                />

                                                <span className={`text-sm ${allSelected ? "opacity-50" : ""}`}>
                                                    {perm.display_name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {errorMessage && (
                    <p className="text-center py-1 text-red-600 font-semibold">{errorMessage}</p>
                )}

                <button type="submit" className="button mx-auto !mt-4">
                    {editRole ? "Update Role" : "Save Role"}
                </button>
            </form>
        </Modal>
    );
};

export default RoleManageModal;
