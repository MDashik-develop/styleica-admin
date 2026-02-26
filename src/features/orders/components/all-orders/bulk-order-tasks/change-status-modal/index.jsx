import React, { useState } from "react";
import { Modal } from "antd";
import FormInput from "../../../../../../components/reusable/form-input";
import { SubmitButton } from "../../../../../../components/reusable/ui/action-btns";
import { useGetAllOrderStatus } from "../../../../services/orderStatusApi";
import toast from "react-hot-toast";
import { useOrderStatusChange } from "../../../../services/bulkOrdersApi";


const ChangeStatusModal = ({ selectedOrders, setSelectedOrders }) => {

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(null);
    const { data, isLoading } = useGetAllOrderStatus();
    const orderStatusChange = useOrderStatusChange();


    const btnLoading = orderStatusChange.isLoading || orderStatusChange.isPending;


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!status) {
            toast.error("Select Status");
            return;
        };

        const payload = {
            status_id: status,
            ids: selectedOrders.map(order => order.id),
        };

        orderStatusChange.mutate(payload, {
            onSuccess: (res) => {
                toast.success(res?.message || "Status updated");
                setSelectedOrders([]);
                setOpen(false);
                setStatus(null);
            },
            onError: (err) => {
                toast.error(
                    err?.response?.data?.message || "Failed to change"
                );
            },
        });
    };

    // console.log(selectedOrders);



    return (
        <>
            <button className="button !bg-yellow-600 !rounded-full" onClick={() => setOpen(true)} disabled={selectedOrders?.length == 0}>
                Change Status
            </button>

            <Modal
                title="Change Order Status"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                {
                    isLoading ?
                        <div>Loading Status...</div>
                        :
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <FormInput
                                label="Order Status"
                                type="select"
                                value={status}
                                onChange={setStatus}
                                placeholder="Select status"
                                loading={isLoading}
                                options={
                                    data?.map(status => ({
                                        label: status.name,
                                        value: status.id,
                                    })) || []
                                }
                            />

                            <div className="flex justify-end gap-3 pt-2">
                                <button onClick={() => setOpen(false)} type="button" className="button-outline">Cancel</button>
                                <SubmitButton btnText="Change Status" loading={btnLoading} />
                            </div>
                        </form>
                }
            </Modal>
        </>
    );
};

export default ChangeStatusModal;
