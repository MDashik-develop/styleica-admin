import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import FormInput from "../../../../../components/reusable/form-input";
import toast from "react-hot-toast";
import { SubmitButton } from "../../../../../components/reusable/ui/action-btns";
import { useCreateShipping, useUpdateShipping } from "../../../services/shippingApi";


const ShippingManageModal = ({ open, setOpen, editData, setEditData }) => {

    const [errMessage, setErrMessage] = useState("");
    const createMutation = useCreateShipping();
    const updateMutation = useUpdateShipping();

    const [formData, setFormData] = useState({
        name: null,
        delivery_time: null,
        base_charge: null,
        per_kg_charge: null,
        cod_available: true,
        status: true,
        description: null,
    });

    const loading = createMutation.isPending || createMutation.isLoading ||
        updateMutation.isPending || updateMutation.isLoading;
    const btnText = editData ? "Update" : "Add";

    // Load initial data
    useEffect(() => {
        if (editData) {
            setFormData({
                name: editData?.name || null,
                delivery_time: editData?.delivery_time || null,
                base_charge: editData?.base_charge || null,
                per_kg_charge: editData?.per_kg_charge || null,
                description: editData?.description || null,
                cod_available:
                    editData?.cod_available === "1" || editData?.cod_available === 1
                        ? true
                        : false,
                status:
                    editData?.status === "1" || editData?.status === 1 ? true : false,
            });
        } else {
            setFormData({
                name: null,
                delivery_time: null,
                base_charge: null,
                per_kg_charge: null,
                cod_available: true,
                status: true,
                description: null,
            });
        }
        setErrMessage("");
    }, [editData, open]);

    // Handle input change
    const handleInputChange = (e, name) => {
        setErrMessage("");
        const fieldName = name || e.target?.name;
        let fieldValue = e.target ? e.target.value : e;

        // Convert empty string to null
        if (fieldValue === "") fieldValue = null;

        setFormData(prev => ({ ...prev, [fieldName]: fieldValue }));
    };

    // Submit function
    const handleSubmit = (e) => {

        e.preventDefault();
        setErrMessage("");

        if (!formData.name || formData.cod_available === undefined || formData.status === undefined) {
            setErrMessage("Please fill (Name, COD Available, Status)");
            return;
        }

        const payload = { ...formData };

        // console.log("payload", payload);


        if (editData) {
            updateMutation.mutate(
                { id: editData.id, payload },
                {
                    onSuccess: (res) => {
                        toast.success(res?.message || "Updated");
                        closeModal();
                    },
                    onError: (err) => {
                        toast.error(err?.response?.data?.message || "Update failed!");
                    }
                }
            );
        } else {
            createMutation.mutate(payload, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Created");
                    closeModal();
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Create failed!");
                }
            });
        }
    };

    // Close modal and reset
    const closeModal = () => {
        setFormData({
            name: null,
            delivery_time: null,
            base_charge: null,
            per_kg_charge: null,
            cod_available: true,
            status: true,
            description: null,
        });
        setErrMessage("");
        setEditData(null);
        setOpen(false);
    };


    return (
        <Modal
            title={editData ? "Edit Shipping Method" : "Add New Shipping Method"}
            open={open}
            onCancel={closeModal}
            footer={null}
            centered
            width={500}
        >
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">

                    <FormInput
                        label="Name"
                        name="name"
                        type="text"
                        Required
                        placeholder="Enter shipping method name"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                    />

                    <FormInput
                        label="Delivery Time"
                        name="delivery_time"
                        type="text"
                        placeholder="Enter delivery time"
                        value={formData.delivery_time || ""}
                        onChange={handleInputChange}
                    />

                    <FormInput
                        label="Base Charge"
                        name="base_charge"
                        type="number"
                        placeholder="Enter base charge"
                        value={formData.base_charge || ""}
                        onChange={handleInputChange}
                    />

                    <FormInput
                        label="Per KG Charge"
                        name="per_kg_charge"
                        type="number"
                        placeholder="Enter per kg charge"
                        value={formData.per_kg_charge || ""}
                        onChange={handleInputChange}
                    />

                    <FormInput
                        label="COD Available"
                        name="cod_available"
                        type="select"
                        value={formData.cod_available}
                        options={[
                            { label: "Yes", value: true },
                            { label: "No", value: false },
                        ]}
                        Required
                        placeholder="Select COD availability"
                        onChange={(value) => handleInputChange(value, "cod_available")}
                    />

                    <FormInput
                        label="Status"
                        name="status"
                        type="select"
                        value={formData.status}
                        options={[
                            { label: "Active", value: true },
                            { label: "Inactive", value: false },
                        ]}
                        Required
                        placeholder="Select status"
                        onChange={(value) => handleInputChange(value, "status")}
                    />

                    <div className="md:col-span-2">
                        <FormInput
                            label="Description"
                            name="description"
                            type="textarea"
                            placeholder="Enter description"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                            className="md:col-span-2"
                        />
                    </div>
                </div>

                {errMessage && (
                    <p className="text-center text-red-600 pt-2">{errMessage}</p>
                )}

                <div className="flex justify-end gap-2 pt-4">
                    <button type="button" onClick={closeModal} className="button-outline">
                        Cancel
                    </button>

                    <SubmitButton btnText={btnText} loading={loading} />
                </div>
            </form>
        </Modal>
    );
};

export default ShippingManageModal;
