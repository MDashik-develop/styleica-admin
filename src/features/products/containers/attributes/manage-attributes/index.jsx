import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import FormInput from "../../../../../components/reusable/form-input";
import { FaRegSquarePlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCreateAttribute, useUpdateAttribute } from "../../../services/attributeApi";
import toast from "react-hot-toast";
import { SubmitButton } from "../../../../../components/reusable/ui/action-btns";


const ManageAttribute = ({ open, setOpen, editData, setEditData }) => {

    const [errMessage, setErrMessage] = useState("");
    const createMutation = useCreateAttribute();
    const updateMutation = useUpdateAttribute();
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        values: [],
    });

    const loading = createMutation.isPending || createMutation.isLoading ||
        updateMutation.isPending || updateMutation.isLoading;
    const btnText = editData ? "Update" : "Add Brand";

    // Load initial data
    useEffect(() => {
        if (editData) {
            setFormData({
                name: editData?.name || "",
                type: editData?.type || "",
                values: editData?.values || [],
            });
        } else {
            setFormData({
                name: "",
                type: "",
                values: [{ value: "", color_code: null }],
            });
        }
        setErrMessage("");
    }, [editData, open]);

    // Handle input change
    const handleInputChange = (e, name) => {
        setErrMessage("");

        const fieldName = name || e.target?.name;
        const fieldValue = e.target ? e.target.value : e;

        setFormData((prev) => ({
            ...prev,
            [fieldName]: fieldValue,
        }));
    };

    const handleValueRowChange = (index, field, value) => {
        const updated = [...formData.values];
        updated[index][field] = value;

        setFormData((prev) => ({
            ...prev,
            values: updated,
        }));
    };

    // Add new row
    const handleAddRow = () => {
        setFormData((prev) => ({
            ...prev,
            values: [...prev.values, { value: "", color_code: null }],
        }));
    };

    // Remove a row
    const handleRemoveRow = (index) => {
        const updated = [...formData.values];
        updated.splice(index, 1);

        setFormData((prev) => ({
            ...prev,
            values: updated.length > 0 ? updated : [{ value: "", color_code: null }],
        }));
    };

    // Submit fn
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrMessage("");

        if (!formData.name || !formData.type) {
            setErrMessage("All fields are required!");
            return;
        }

        // Validate all rows
        for (let v of formData.values) {
            if (!v.value) {
                setErrMessage("Please Add Value");
                return;
            }
        }

        const payload = {
            name: formData.name,
            type: formData.type,
            values: formData.values,
        };

        // console.log("payload:", payload);

        if (editData) {
            updateMutation.mutate(
                { id: editData.id, payload },
                {
                    onSuccess: (res) => {
                        toast.success(res?.message || "Attribute Updated");
                        closeModal();
                    },
                    onError: (err) => {
                        toast.error(err?.response?.data?.message || "Update failed!")
                    },
                }
            );
        } else {
            createMutation.mutate(payload, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Attribute Created");
                    closeModal();
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Create failed!")
                },
            });
        }
    };

    // close modal and reset form inputs
    const closeModal = () => {
        setFormData({
            name: "",
            type: "",
            values: [{ value: "", color_code: "" }],
        });
        setErrMessage("");
        setEditData(null);
        setOpen(false);
    };


    return (
        <Modal
            title={editData ? "Edit Attribute" : "Add New Attribute"}
            open={open}
            onCancel={closeModal}
            footer={null}
            centered
            width={500}
        >
            <form onSubmit={handleSubmit} >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <FormInput
                        label="Name"
                        name="name"
                        type="text"
                        Required
                        placeholder="Enter attribute name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />

                    <FormInput
                        label="Type"
                        name="type"
                        type="select"
                        value={formData.type}
                        options={[
                            // { label: "Size", value: "size" },
                            { label: "Text", value: "text" },
                            { label: "Color", value: "color" },
                        ]}
                        Required
                        placeholder="Select Type"
                        onChange={(value) => handleInputChange(value, "type")}
                    />

                    <div className="md:col-span-2">
                        <div className="flex justify-between items-center my-2">
                            <h3 className="font-semibold">Attribute Values</h3>
                            <button type="button" className="button !p-2" onClick={handleAddRow}>
                                <FaRegSquarePlus size={18} />
                            </button>
                        </div>

                        {formData.values.map((row, index) => (
                            <div key={index} className="flex items-center gap-3 mb-3">
                                <div className="flex-1 grid grid-cols-2 gap-x-3">
                                    <FormInput
                                        label="Value"
                                        type="text"
                                        value={row.value}
                                        onChange={(e) =>
                                            handleValueRowChange(index, "value", e.target.value)
                                        }
                                        Required
                                    />

                                    {formData.type === "color" && (
                                        <FormInput
                                            label="Color Code"
                                            type="text"
                                            value={row.color_code}
                                            onChange={(e) =>
                                                handleValueRowChange(index, "color_code", e.target.value)
                                            }
                                            Required
                                        />
                                    )}
                                </div>

                                <button
                                    type="button"
                                    className="button !bg-red-600 !p-2 mt-3"
                                    onClick={() => handleRemoveRow(index)}
                                >
                                    <RiDeleteBin6Line size={18} />
                                </button>
                            </div>
                        ))}
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

export default ManageAttribute;
