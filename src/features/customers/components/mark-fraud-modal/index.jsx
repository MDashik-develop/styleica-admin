import React, { useState } from "react";
import { Modal, message } from "antd";
import FormInput from "../../../../components/reusable/form-input";
import toast from "react-hot-toast";
import { useMarkCustomerAsFraud } from "../../services/customerApi";
import { SubmitButton } from "../../../../components/reusable/ui/action-btns";


const MarkFraudModal = ({ data }) => {

    const [visible, setVisible] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [formData, setFormData] = useState({
        type: "Fraud",
        label: data?.label || "",
        note: data?.note || "",
    });

    const { mutate: markFraud, isLoading, isPending } = useMarkCustomerAsFraud();
    const loading = isLoading || isPending;


    // Handle input change
    const handleChange = (e, name) => {
        setErrMessage("");
        let fieldName = name || e.target?.name;
        let fieldValue = e.target ? e.target.value : e;

        setFormData((prev) => ({
            ...prev,
            [fieldName]: fieldValue,
        }));
    };

    // Submit payload
    const handleSubmit = (e) => {

        e.preventDefault();
        setErrMessage("");

        if (!formData.type || !formData.label || !formData.note) {
            setErrMessage("All fields are required.");
            return;
        }

        markFraud(
            {
                id: data?.id,
                payload: formData,
            },
            {
                onSuccess: (res) => {
                    toast.success(res?.message || "Marked Successfully!");
                    setVisible(false);
                },
                onError: (err) => {
                    const apiError = err?.response?.data?.message || "Something went wrong.";
                    setErrMessage(apiError);
                },
            }
        );
    };


    return (
        <>
            <button className="bg-red-600 text-light text-xs 2xl:text-sm px-1.5 py-0.5 rounded-sm" onClick={() => setVisible(true)}>
                Mark Fraud
            </button>

            <Modal
                title={null}
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                width={500}
            >
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <h2 className="text-lg font-semibold">Mark Fraud - <span className="text-red-600">{data?.name}</span></h2>
                    <div className="grid grid-cols-1">

                        <FormInput
                            label="Type"
                            name="type"
                            type="select"
                            value={formData.type}
                            options={[,
                                { label: "Fraud", value: "Fraud" },
                            ]}
                            onChange={(value) => handleChange(value, "type")}
                            placeholder="Select Type"
                            Required
                        />

                        <FormInput
                            label="Label  (%)"
                            name="label"
                            value={formData.label}
                            onChange={handleChange}
                            placeholder="Enter label"
                        />

                        <FormInput
                            label="Note"
                            name="note"
                            type="textarea"
                            value={formData.note}
                            onChange={handleChange}
                            placeholder="Enter note"
                            Required
                        />
                    </div>

                    <p className="text-red-600 font-semibold text-center">{errMessage}</p>

                    <div className="flex justify-end items-center gap-3 mt-5">
                        <button type="button" className="button-outline" onClick={() => setVisible(false)}>
                            Cancel
                        </button>
                        <SubmitButton loading={loading} />
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default MarkFraudModal;
