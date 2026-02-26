import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import FormInput from "../../../../components/reusable/form-input";
import dayjs from "dayjs";

const DamageManageModal = ({
    openModal = false,
    onClose = () => { },
    onSubmit = () => { },
    isEdit = false,
    damageData = null,
}) => {
    const [formData, setFormData] = useState({
        product: "",
        lot: "",
        qty: "",
        type: "",
        loss: "",
        date: null,
        note: "",
    });

    // Load data on edit or reset for new
    useEffect(() => {
        if (openModal) {
            if (isEdit && damageData) {
                setFormData({
                    product: damageData.product || "",
                    lot: damageData.lot || "",
                    qty: damageData.qty || "",
                    type: damageData.type || "",
                    loss: damageData.loss || "",
                    date: damageData.date ? dayjs(damageData.date) : null,
                });
            } else {
                setFormData({
                    product: "",
                    lot: "",
                    qty: "",
                    type: "",
                    loss: "",
                    date: null,
                });
            }
        }
    }, [openModal, isEdit, damageData]);

    const handleSubmit = () => {
        if (!formData.product || !formData.lot || !formData.qty || !formData.type || !formData.loss || !formData.date) {
            message.error("Please fill all required fields");
            return;
        }

        onSubmit(formData); // send data to parent
        message.success(isEdit ? "Damage updated!" : "Damage added!");
        onClose();
    };

    return (
        <Modal
            open={openModal}
            onCancel={onClose}
            title={isEdit ? "Edit Damage" : "Add Damage"}
            width={700}
            footer={null}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">

                <FormInput
                    label="Product Name"
                    placeholder="Enter product name"
                    Required
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                />

                <FormInput
                    label="Lot Number"
                    placeholder="Enter lot number"
                    Required
                    value={formData.lot}
                    onChange={(e) => setFormData({ ...formData, lot: e.target.value })}
                />

                <FormInput
                    label="Quantity"
                    type="number"
                    Required
                    value={formData.qty}
                    onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
                />

                <FormInput
                    label="Damage Type"
                    type="select"
                    Required
                    options={[
                        { label: "Broken Screen", value: "Broken Screen" },
                        { label: "Water Damage", value: "Water Damage" },
                        { label: "Expired", value: "Expired" },
                        { label: "Other", value: "Other" },
                    ]}
                    value={formData.type}
                    onChange={(value) => setFormData({ ...formData, type: value })}
                />

                <FormInput
                    label="Loss Amount (BDT)"
                    type="number"
                    Required
                    value={formData.loss}
                    onChange={(e) => setFormData({ ...formData, loss: e.target.value })}
                />

                <FormInput
                    label="Date"
                    type="date"
                    Required
                    value={formData.date}
                    onChange={(value) => setFormData({ ...formData, date: value })}
                />
                <div className="col-span-1 md:col-span-2">
                    <FormInput
                        label="Note"
                        type="textarea"
                        Required
                        value={formData.note}
                        onChange={(value) => setFormData({ ...formData, note: value })}
                    />
                </div>
            </div>

            {/* Custom Footer */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={onClose}
                    className="button-outline mr-3"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="button"
                >
                    {isEdit ? "Update" : "Add"}
                </button>
            </div>
        </Modal>
    );
};

export default DamageManageModal;
