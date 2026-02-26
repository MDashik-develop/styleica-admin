import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import FormInput from "../../../../components/reusable/form-input";


const WarehouseManageModal = ({ visible, onClose, isEdit, warehouseData, onSave }) => {

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        manager: "",
        capacity: "",
        mobile: "",
        email: ""
    });

    useEffect(() => {
        if (isEdit && warehouseData) {
            setFormData(warehouseData);
        }
    }, [warehouseData]);

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Modal
            title={isEdit ? "Edit Warehouse" : "Add Warehouse"}
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <div className="space-y-4">

                <FormInput
                    label="Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <FormInput
                    label="Location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />

                <FormInput
                    label="Manager"
                    required
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                />

                <FormInput
                    label="Capacity"
                    required
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />

                {/* New Mobile Field */}
                <FormInput
                    label="Mobile Number"
                    required
                    type="number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                />

                {/* New Email Field */}
                <FormInput
                    label="Email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <div className="flex justify-end gap-3 pt-4">
                    <button className="button-outline" onClick={onClose}>
                        Cancel
                    </button>

                    <button className="button" onClick={handleSubmit}>
                        {isEdit ? "Update" : "Save"}
                    </button>
                </div>

            </div>
        </Modal>
    );
};

export default WarehouseManageModal;
