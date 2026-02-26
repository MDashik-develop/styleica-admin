import React, { useState } from "react";
import { Modal } from "antd";
import toast from "react-hot-toast";
import FormInput from "../../../../components/reusable/form-input";
import { SubmitButton } from "../../../../components/reusable/ui/action-btns";
import { useBulkStatusChange } from "../../services/productsApi";

const BulckStatusChangeModal = ({ selectedProducts, setSelectedProducts }) => {

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(null);
    const bulkStatusChange = useBulkStatusChange();

    const statusOptions = ['pending', 'published', 'deactivated', 'suspended'];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!status) {
            toast.error("Select Status");
            return;
        }

        const payload = {
            status: status,
            ids: selectedProducts.map(product => product.id),
        };

        bulkStatusChange.mutate(payload, {
            onSuccess: (res) => {
                toast.success(res?.message || "Product status changed");
                setOpen(false);
                setStatus(null);
                setSelectedProducts([]);
            },
            onError: (err) => {
                toast.error(
                    err?.response?.data?.message || "Failed to change status"
                );
            },
        });
    };

    return (
        <>
            <button
                className="button !bg-yellow-600  "
                onClick={() => setOpen(true)}
                disabled={selectedProducts?.length === 0}
            >
                Status change
            </button>

            <Modal
                title="Status Change"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                        label="Select Status"
                        type="select"
                        value={status}
                        onChange={setStatus}
                        placeholder="Choose a status"
                        options={statusOptions.map(sts => ({
                            label: sts,
                            value: sts,
                        }))}
                    />

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            onClick={() => setOpen(false)}
                            type="button"
                            className="button-outline"
                        >
                            Cancel
                        </button>
                        <SubmitButton btnText="Change Status" loading={bulkStatusChange?.isLoading} />
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default BulckStatusChangeModal;
