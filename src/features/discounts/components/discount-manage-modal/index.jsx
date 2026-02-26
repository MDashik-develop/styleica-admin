import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import FormInput from "../../../../components/reusable/form-input";
import dayjs from "dayjs";

const DiscountManageModal = ({
    isEdit = false,
    discountData = null,
    openModal = false,
    onClose = () => { },
}) => {

    const [formData, setFormData] = useState({
        code: "",
        type: "percentage",
        value: "",
        minPurchase: "",
        limit: "",
        start: null,
        end: null,
        status: "active",
    });

    // OPEN & LOAD DATA WHEN EDITING
    useEffect(() => {
        if (openModal) {
            if (isEdit && discountData) {
                setFormData({
                    code: discountData.code || "",
                    type: discountData.type || "percentage",
                    value: discountData.value || "",
                    minPurchase: discountData.minPurchase || "",
                    limit: discountData.limit || "",
                    start: discountData.start ? dayjs(discountData.start) : null,
                    end: discountData.end ? dayjs(discountData.end) : null,
                    status: discountData.status || "active",
                });
            } else {
                // RESET WHEN ADDING NEW
                setFormData({
                    code: "",
                    type: "percentage",
                    value: "",
                    minPurchase: "",
                    limit: "",
                    start: null,
                    end: null,
                    status: "active",
                });
            }
        }
    }, [openModal, isEdit, discountData]);

    const handleSubmit = () => {
        message.success(isEdit ? "Discount updated!" : "Discount created!");
        onClose();
    };

    return (
        <Modal
            open={openModal}
            onCancel={onClose}
            onOk={handleSubmit}
            okText={isEdit ? "Update" : "Create"}
            title={isEdit ? "Edit Discount" : "Create Discount"}
            width={700}
            footer={[
                <div className="flex justify-end items-center gap-3">
                    <button
                        key="cancel"
                        onClick={onClose}
                        className="button-outline"
                    >
                        Cancel
                    </button>

                    <button
                        key="customSubmit"
                        onClick={handleSubmit}
                        className="button "
                    >
                        {isEdit ? "Update" : "Create"}
                    </button>
                </div>
            ]}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">

                <FormInput
                    label="Discount Code"
                    placeholder="Enter discount code"
                    Required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />

                <FormInput
                    label="Discount Type"
                    type="select"
                    Required
                    options={[
                        { label: "Percentage", value: "percentage" },
                        { label: "Flat Amount", value: "flat" },
                        { label: "Free Shipping", value: "free_shipping" },
                    ]}
                    value={formData.type}
                    onChange={(value) => setFormData({ ...formData, type: value })}
                />

                <FormInput
                    label={
                        formData.type === "percentage"
                            ? "Percentage (%)"
                            : formData.type === "flat"
                                ? "Flat Amount (BDT)"
                                : "Value"
                    }
                    type="number"
                    Required
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                />

                <FormInput
                    label="Minimum Purchase (BDT)"
                    type="number"
                    value={formData.minPurchase}
                    onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                />

                <FormInput
                    label="Usage Limit"
                    type="number"
                    Required
                    value={formData.limit}
                    onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                />

                <FormInput
                    label="Status"
                    type="select"
                    Required
                    options={[
                        { label: "Active", value: "active" },
                        { label: "Upcoming", value: "upcoming" },
                        { label: "Expired", value: "expired" },
                    ]}
                    value={formData.status}
                    onChange={(value) => setFormData({ ...formData, status: value })}
                />

                <FormInput
                    label="Start Date"
                    type="date"
                    Required
                    value={formData.start}
                    onChange={(value) => setFormData({ ...formData, start: value })}
                />

                <FormInput
                    label="End Date"
                    type="date"
                    Required
                    value={formData.end}
                    onChange={(value) => setFormData({ ...formData, end: value })}
                />

            </div>
        </Modal>
    );
};

export default DiscountManageModal;
