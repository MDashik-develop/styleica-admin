import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import FormInput from "../../../../../components/reusable/form-input";
import toast from "react-hot-toast";
import { SubmitButton } from "../../../../../components/reusable/ui/action-btns";
import { useUpdatePayment } from "../../../services/paymentApi";
import Media from "../../../../../components/reusable/media";


const PaymentManageModal = ({ open, setOpen, paymentData }) => {

    const [errMessage, setErrMessage] = useState("");
    const [selectedMedia, setSelectedMedia] = useState([]);
    const updateMutation = useUpdatePayment();

    const [formData, setFormData] = useState({
        name: null,
        sandbox_mode: true,
        description: null,
        is_active: true,
        credentials: [],
        instructions: null,
        media_id: null,
    });

    const loading = updateMutation.isPending || updateMutation.isLoading;

    // Load payment data for edit
    useEffect(() => {
        if (paymentData) {
            setFormData({
                name: paymentData?.name || null,
                sandbox_mode: paymentData?.sandbox_mode === "1" || paymentData?.sandbox_mode === 1,
                description: paymentData?.description || null,
                is_active: paymentData?.is_active === "1" || paymentData?.is_active === 1,
                credentials: paymentData?.credentials ? JSON.parse(paymentData.credentials) : [],
                instructions: paymentData?.instructions || null,
                media_id: paymentData?.media_id || null,
            });
        }
    }, [paymentData]);

    // Handle input changes
    const handleInputChange = (e, name) => {
        setErrMessage("");
        const fieldName = name || e.target?.name;
        let fieldValue = e.target ? e.target.value : e;

        if (fieldValue === "") fieldValue = null;
        setFormData(prev => ({ ...prev, [fieldName]: fieldValue }));
    };

    // Handle credentials input (array of key/value pairs)
    const handleCredentialChange = (index, keyOrValue, value) => {
        const updated = [...formData.credentials];
        if (!updated[index]) updated[index] = { key: null, value: null };
        updated[index][keyOrValue] = value;
        setFormData(prev => ({ ...prev, credentials: updated }));
    };

    // Add new credential row
    const addCredential = () => {
        setFormData(prev => ({ ...prev, credentials: [...prev.credentials, { key: null, value: null }] }));
    };

    // Remove credential row
    const removeCredential = (index) => {
        const updated = [...formData.credentials];
        updated.splice(index, 1);
        setFormData(prev => ({ ...prev, credentials: updated }));
    };

    // Submit update
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrMessage("");

        if (!formData.name) {
            setErrMessage("Name is required");
            return;
        }
        if (selectedMedia.length === 0) {
            setErrMessage("Media is required");
            return;
        }

        const payload = { ...formData, media_id: selectedMedia[0]?.id };

        console.log(payload);


        // return;

        updateMutation.mutate(
            { id: paymentData?.id, payload },
            {
                onSuccess: (res) => {
                    toast.success(res?.message || "Payment method updated");
                    closeModal();
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Update failed");
                }
            }
        );
    };

    // Close modal
    const closeModal = () => {
        setFormData({
            name: null,
            sandbox_mode: true,
            description: null,
            is_active: true,
            credentials: [],
            instructions: null,
            media_id: null,
        });
        setErrMessage("");
        setOpen(false);
    };


    // console.log(paymentData);



    return (
        <Modal
            title="Edit Payment Method"
            open={open}
            onCancel={closeModal}
            footer={null}
            centered
            width={600}
        >
            <form onSubmit={handleSubmit} className="space-y-4">

                <FormInput
                    label="Name"
                    name="name"
                    type="text"
                    Required
                    placeholder="Enter payment method name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                />

                <div className="grid grid-cols-2 gap-3">
                    <FormInput
                        label="Sandbox Mode"
                        name="sandbox_mode"
                        type="select"
                        value={formData.sandbox_mode}
                        options={[
                            { label: "Enabled", value: true },
                            { label: "Disabled", value: false },
                        ]}
                        onChange={(value) => handleInputChange(value, "sandbox_mode")}
                    />

                    <FormInput
                        label="Status"
                        name="is_active"
                        type="select"
                        value={formData.is_active}
                        options={[
                            { label: "Active", value: true },
                            { label: "Inactive", value: false },
                        ]}
                        onChange={(value) => handleInputChange(value, "is_active")}
                    />
                </div>

                <FormInput
                    label="Description"
                    name="description"
                    type="textarea"
                    placeholder="Enter description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                />

                <FormInput
                    label="Instructions"
                    name="instructions"
                    type="textarea"
                    placeholder="Enter instructions"
                    value={formData.instructions || ""}
                    onChange={handleInputChange}
                />

                <div>
                    <h4 className="font-semibold mb-2">Credentials</h4>
                    {formData.credentials.map((cred, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Key"
                                value={cred.key || ""}
                                onChange={(e) => handleCredentialChange(index, "key", e.target.value)}
                                className="flex-1 border p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={cred.value || ""}
                                onChange={(e) => handleCredentialChange(index, "value", e.target.value)}
                                className="flex-1 border p-2 rounded"
                            />
                            <button type="button" onClick={() => removeCredential(index)} className="bg-red-600 text-white px-2 rounded h-fit mt-2.5">X</button>
                        </div>
                    ))}
                    <button type="button" onClick={addCredential} className="button">
                        + Add Credential
                    </button>
                </div>

                <div>
                    <h4 className="pb-1">Upload Media:</h4>
                    <Media selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} />
                </div>

                {errMessage && <p className="text-red-600">{errMessage}</p>}

                <div className="flex justify-end gap-2 pt-4">
                    <button type="button" onClick={closeModal} className="button-outline">Cancel</button>
                    <SubmitButton btnText="Update" loading={loading} />
                </div>
            </form>
        </Modal>
    );
};

export default PaymentManageModal;
