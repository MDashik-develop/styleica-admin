// ManageAreaModal.jsx
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import FormInput from "../../../../../components/reusable/form-input";
import { FaRegSquarePlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useCreateArea, useUpdateArea } from "../../../services/area";
import toast from "react-hot-toast";
import { SubmitButton } from "../../../../../components/reusable/ui/action-btns";


const ManageAreaModal = ({ open, setOpen, editData, setEditData }) => {

    const [errMessage, setErrMessage] = useState("");
    const createMutation = useCreateArea();
    const updateMutation = useUpdateArea();

    const [formData, setFormData] = useState({
        id: null,
        district_name: "",
        bn_name: "",
        thanas: [{ id: null, thana_name: "", bn_name: "" }],
    });

    const loading =
        createMutation.isPending ||
        createMutation.isLoading ||
        updateMutation.isPending ||
        updateMutation.isLoading;

    const btnText = editData ? "Update" : "Add Area";

    // Load initial data on edit or open
    useEffect(() => {
        if (editData) {
            setFormData({
                id: editData.id,
                district_name: editData.district_name || "",
                bn_name: editData.bn_name || "",
                thanas:
                    editData.thanas?.length > 0
                        ? editData.thanas.map((t) => ({
                            id: t.id,
                            thana_name: t.thana_name,
                            bn_name: t.bn_name,
                        }))
                        : [{ id: null, thana_name: "", bn_name: "" }],
            });
        } else {
            setFormData({
                id: null,
                district_name: "",
                bn_name: "",
                thanas: [{ id: null, thana_name: "", bn_name: "" }],
            });
        }
        setErrMessage("");
    }, [editData, open]);

    // Handle district input change
    const handleInputChange = (value, fieldName) => {
        setErrMessage("");
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    // Handle thana row changes
    const handleThanaChange = (index, field, value) => {
        const updated = [...formData.thanas];
        updated[index][field] = value;
        setFormData((prev) => ({ ...prev, thanas: updated }));
    };

    // Add new thana row
    const handleAddRow = () => {
        setFormData((prev) => ({
            ...prev,
            thanas: [...prev.thanas, { id: null, thana_name: "", bn_name: "" }],
        }));
    };

    // Remove a thana row
    const handleRemoveRow = (index) => {
        const updated = [...formData.thanas];
        updated.splice(index, 1);
        setFormData((prev) => ({
            ...prev,
            thanas: updated.length > 0 ? updated : [{ id: null, thana_name: "", bn_name: "" }],
        }));
    };

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrMessage("");

        if (!formData.district_name || !formData.bn_name) {
            setErrMessage("District name is required!");
            return;
        }

        // Validate all thanas
        for (let t of formData.thanas) {
            if (!t.thana_name || !t.bn_name) {
                setErrMessage("All thana fields are required!");
                return;
            }
        }

        const payload = { ...formData };

        // console.log("payload", payload);
        // return;


        if (editData) {
            updateMutation.mutate(payload,
                {
                    onSuccess: (res) => {
                        toast.success(res?.message || "Area Updated");
                        closeModal();
                    },
                    onError: (err) => {
                        toast.error(err?.response?.data?.message || "Update failed!");
                    },
                }
            );
        } else {
            createMutation.mutate(payload, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Area Created");
                    closeModal();
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Create failed!");
                },
            });
        }
    };

    // Close modal
    const closeModal = () => {
        setFormData({
            id: null,
            district_name: "",
            bn_name: "",
            thanas: [{ id: null, thana_name: "", bn_name: "" }],
        });
        setErrMessage("");
        setEditData(null);
        setOpen(false);
    };

    return (
        <Modal
            title={editData ? "Edit Area" : "Add New Area"}
            open={open}
            onCancel={closeModal}
            footer={null}
            centered
            width={600}
        >
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                        label="District Name (EN)"
                        type="text"
                        value={formData.district_name}
                        onChange={(e) => handleInputChange(e.target.value, "district_name")}
                        required
                    />
                    <FormInput
                        label="District Name (BN)"
                        type="text"
                        value={formData.bn_name}
                        onChange={(e) => handleInputChange(e.target.value, "bn_name")}
                        required
                    />
                </div>

                <div className="my-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">Thanas</h3>
                        <button type="button" className="button !p-2" onClick={handleAddRow}>
                            <FaRegSquarePlus size={18} />
                        </button>
                    </div>

                    {formData.thanas.map((row, index) => (
                        <div key={index} className="flex gap-3 mb-3 items-end">
                            <div className="grid grid-cols-2 gap-3 flex-1">
                                <FormInput
                                    label="Thana Name (EN)"
                                    type="text"
                                    value={row.thana_name}
                                    onChange={(e) => handleThanaChange(index, "thana_name", e.target.value)}
                                    required
                                />
                                <FormInput
                                    label="Thana Name (BN)"
                                    type="text"
                                    value={row.bn_name}
                                    onChange={(e) => handleThanaChange(index, "bn_name", e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                className="button !bg-red-600 !p-2"
                                onClick={() => handleRemoveRow(index)}
                            >
                                <RiDeleteBin6Line size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                {errMessage && <p className="text-center text-red-600 mb-2">{errMessage}</p>}

                <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={closeModal} className="button-outline">
                        Cancel
                    </button>
                    <SubmitButton btnText={btnText} loading={loading} />
                </div>
            </form>
        </Modal>
    );
};

export default ManageAreaModal;