import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import FormInput from "../../../../components/reusable/form-input";
import Media from "../../../../components/reusable/media";
import { useAllRoles } from "../../../settings/services/rolePermissionApi";
import { SubmitButton } from "../../../../components/reusable/ui/action-btns";


const UserManageModal = ({
    visible,
    onClose,
    onSave,
    isEdit = false,
    userData = null,
    loading
}) => {
    const [roles, setRoles] = useState([]);
    const { data: rolesData, isLoading } = useAllRoles();
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [errMessage, setErrMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        role_id: "",
        password: "",
        status: true,
    });


    useEffect(() => {
        if (!isLoading && rolesData) {
            const formattedRoles = rolesData.map(role => ({
                label: role.display_name,
                value: role.id,
            }));
            setRoles(formattedRoles);
        }
    }, [isLoading, rolesData]);

    // Load user data when editing
    useEffect(() => {
        if (isEdit && userData) {
            setFormData({
                id: userData.id || "",
                name: userData.name || "",
                email: userData.email || "",
                phone: userData.phone || "",
                role_id: userData?.roles[0].id || "",
                status: userData.active !== undefined ? userData.active : true,
                password: userData.password || "",
            });
            setSelectedMedia([userData?.media] || null);
        } else {
            setFormData({
                name: "",
                email: "",
                phone: "",
                role_id: "",
                status: true,
                password: "",
            });
        }
    }, [isEdit, userData]);

    //  input onchange fn
    const handleChange = (field, value) => {
        setErrMessage("");
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    // submit fn
    const handleSubmit = (e) => {

        e.preventDefault();
        setErrMessage("");

        if (!formData.name || !formData.email || !formData.role_id || !formData?.password || selectedMedia?.length == 0 || !selectedMedia) {
            setErrMessage("Fill all required inputs!");
            return;
        }
        const payload = {
            role_id: formData.role_id,
            user: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password || "",
                active: formData.status,
                media_id: selectedMedia[0]?.id || 0,
            },
        };

        onSave(payload);
    };


    return (
        <Modal
            title={isEdit ? "Edit User" : "Add User"}
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Type full name"
                        Required
                    />
                    <FormInput
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Type email"
                        Required
                    />
                    <FormInput
                        label="Phone Number"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="Type phone number"
                        Required
                    />
                    <FormInput
                        label="Role"
                        type="select"
                        value={formData.role_id}
                        options={roles}
                        onChange={(value) => handleChange("role_id", value)}
                        placeholder="Select Role"
                        Required
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        placeholder="Type password"
                        Required
                    />
                    <FormInput
                        label="Status"
                        type="select"
                        value={formData.status}
                        options={[
                            { label: "Active", value: true },
                            { label: "Inactive", value: false },
                        ]}
                        onChange={(value) => handleChange("status", value)}
                        placeholder="Select Status"
                        Required
                    />
                </div>

                <div className="flex gap-2">
                    <p className="font-semibold">Upload Image: </p>
                    <Media
                        selectedMedia={selectedMedia}
                        setSelectedMedia={setSelectedMedia}
                    />
                </div>

                {errMessage && <p className="text-center text-red-600 !mb-0">{errMessage}</p>}

                {/* FOOTER BUTTONS */}
                <div className="flex justify-end gap-3 pt-4">
                    <button className="button-outline" onClick={onClose}>Cancel</button>
                    <SubmitButton btnText={isEdit ? "Update" : "Add User"} loading={loading} />
                </div>
            </form>
        </Modal>
    );
};

export default UserManageModal;
