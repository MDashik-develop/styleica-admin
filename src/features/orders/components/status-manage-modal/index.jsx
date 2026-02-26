import React, { useEffect, useState } from "react";
import { Modal, Switch } from "antd";
import FormInput from "../../../../components/reusable/form-input";
import { FaRegSquarePlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { SubmitButton } from "../../../../components/reusable/ui/action-btns";
import { useCreateOrderStatus, useUpdateOrderStatus } from "../../services/orderStatusApi";


const StatusManageModal = ({ open, setOpen, editData, setEditData }) => {

    const createMutation = useCreateOrderStatus();
    const updateMutation = useUpdateOrderStatus();
    const [errMessage, setErrMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        color: "",
        sort_order: 0,
        send_notification: true,
        notes: [{ content: "" }],
    });

    const loading =
        createMutation.isPending ||
        updateMutation.isPending;

    const btnText = editData ? "Update Status" : "Add Status";

    // Load Initial Data
    useEffect(() => {
        if (editData) {
            setFormData({
                name: editData?.name || "",
                description: editData?.description || "",
                color: editData?.color || "",
                sort_order: editData?.sort_order ?? 0,
                send_notification: !!editData?.send_notification,
                notes:
                    editData?.internal_notes?.length > 0
                        ? editData.internal_notes.map(n => ({ id: n.id, content: n.content }))
                        : [{ content: "" }],
            });
        } else {
            setFormData({
                name: "",
                description: "",
                color: "",
                sort_order: 0,
                send_notification: true,
                notes: [{ content: "" }],
            });
        }
        setErrMessage("");
    }, [editData, open]);

    // ------------------ Handlers ------------------ //
    const handleChange = (e, name) => {
        setErrMessage("");
        const field = name || e.target.name;
        const value = e?.target ? e.target.value : e;

        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleNoteChange = (index, value) => {
        const updated = [...formData.notes];
        updated[index].content = value;

        setFormData(prev => ({
            ...prev,
            notes: updated,
        }));
    };

    const addNote = () => {
        setFormData(prev => ({
            ...prev,
            notes: [...prev.notes, { content: "" }],
        }));
    };

    const removeNote = (index) => {
        const updated = [...formData.notes];
        updated.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            notes: updated.length ? updated : [{ content: "" }],
        }));
    };

    // submit fn
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrMessage("");

        if (!formData.name) {
            setErrMessage("Status name is required!");
            return;
        }

        if (!formData.notes.some(n => n.content.trim())) {
            setErrMessage("At least one note is required!");
            return;
        }

        const payload = {
            name: formData.name,
            description: formData.description,
            color: formData.color || null,
            sort_order: Number(formData.sort_order),
            send_notification: formData.send_notification,
            internal_notes: formData.notes
                .filter(n => n.content.trim())
                .map(n => {
                    // include id for update
                    return n.id ? { id: n.id, content: n.content } : { content: n.content };
                }),
        };

        // console.log("payload", payload);

        if (editData) {
            updateMutation.mutate(
                { id: editData.id, payload },
                {
                    onSuccess: (res) => {
                        toast.success(res?.message || "Status updated");
                        closeModal();
                    },
                    onError: (err) => {
                        toast.error(err?.response?.data?.message || "Update failed");
                    },
                }
            );
        } else {
            createMutation.mutate(payload, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Status created");
                    closeModal();
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Create failed");
                },
            });
        }
    };

    // close modal
    const closeModal = () => {
        setFormData({
            name: "",
            description: "",
            color: "",
            sort_order: 0,
            send_notification: true,
            notes: [{ content: "" }],
        });
        setErrMessage("");
        setEditData(null);
        setOpen(false);
    };


    return (
        <Modal
            title={editData ? "Edit Order Status" : "Add Order Status"}
            open={open}
            onCancel={closeModal}
            footer={null}
            centered
            width={520}
        >
            <form onSubmit={handleSubmit} className="space-y-3">

                <FormInput
                    label="Name"
                    name="name"
                    Required
                    value={formData.name}
                    onChange={handleChange}
                />

                <FormInput
                    label="Description"
                    name="description"
                    type="textarea"
                    value={formData.description}
                    onChange={handleChange}
                />

                <div className="grid grid-cols-2 gap-3">
                    <FormInput
                        label="Color"
                        name="color"
                        placeholder="#22c55e"
                        value={formData.color}
                        onChange={handleChange}
                    />

                    <FormInput
                        label="Sort Order"
                        name="sort_order"
                        type="number"
                        value={formData.sort_order}
                        onChange={handleChange}
                    />
                </div>

                <FormInput
                    label="Send Notification"
                    name="send_notification"
                    type="select"
                    value={formData.send_notification}
                    options={[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                    ]}
                    Required
                    onChange={(value) => handleChange(value, "send_notification")}
                />

                {/* Notes */}
                <div>
                    <div className="flex justify-between items-center my-2">
                        <h3 className="font-semibold">Internal Notes</h3>
                        <button
                            type="button"
                            className="button !p-1.5 mt-2"
                            onClick={addNote}
                        >
                            <FaRegSquarePlus size={18} />
                        </button>
                    </div>

                    {formData.notes.map((note, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <div className="flex-1">
                                <FormInput
                                    placeholder="Enter note"
                                    value={note.content}
                                    onChange={(e) =>
                                        handleNoteChange(index, e.target.value)
                                    }
                                    Required
                                />
                            </div>

                            <button
                                type="button"
                                className="button !bg-red-600 !p-1.5 h-fit mt-0.5"
                                onClick={() => removeNote(index)}
                            >
                                <RiDeleteBin6Line size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                {errMessage && (
                    <p className="text-center text-red-600">{errMessage}</p>
                )}

                <div className="flex justify-end gap-2 pt-4">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="button-outline"
                    >
                        Cancel
                    </button>

                    <SubmitButton btnText={btnText} loading={loading} />
                </div>
            </form>
        </Modal>
    );
};

export default StatusManageModal;
