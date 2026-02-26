import React, { useState } from "react";
import { Modal } from "antd";
import FormInput from "../../../../../../components/reusable/form-input";
import { SubmitButton } from "../../../../../../components/reusable/ui/action-btns";
import { useGetAllUsers } from "../../../../../users/services/usersApi";
import toast from "react-hot-toast";
import { useOrderAssignedToUser } from "../../../../services/bulkOrdersApi";


const AssignUserModal = ({ selectedOrders, setSelectedOrders }) => {

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const { data, isLoading } = useGetAllUsers(1, 1000);
    const assignUser = useOrderAssignedToUser();

    const btnLoading = assignUser.isLoading || assignUser.isPending;


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Select User");
            return;
        };

        const payload = {
            assigned_to: user,
            ids: selectedOrders.map(order => order.id),
        };

        assignUser.mutate(payload, {
            onSuccess: (res) => {
                toast.success(res?.message || "User assigned");
                setOpen(false);
                setUser(null);
                setSelectedOrders([]);
            },
            onError: (err) => {
                toast.error(
                    err?.response?.data?.message || "Failed to assign"
                );
            },
        });
    };


    // console.log(data?.data);


    return (
        <>
            <button className="button !bg-blue-600 !rounded-full" onClick={() => setOpen(true)} disabled={selectedOrders?.length == 0}>
                Assign User
            </button>

            <Modal
                title="Assign User"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                {
                    isLoading ?
                        <div>Loading Users...</div>
                        :
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <FormInput
                                label="Select User"
                                type="select"
                                value={user}
                                onChange={setUser}
                                placeholder="Choose a user"
                                options={
                                    data?.data?.map(user => ({
                                        label: user?.name,
                                        value: user?.id
                                    }))
                                }
                            />

                            <div className="flex justify-end gap-3 pt-2">
                                <button onClick={() => setOpen(false)} type="button" className="button-outline">Cancel</button>
                                <SubmitButton btnText="Assign User" loading={btnLoading} />
                            </div>
                        </form>
                }
            </Modal>
        </>
    );
};

export default AssignUserModal;
