import React, { useEffect, useState } from "react";
import FormInput from "../../../../../components/reusable/form-input";
import { useGetAllUsers } from "../../../../users/services/usersApi";
import { Modal } from "antd";
import { TbFilter } from "react-icons/tb";
import { SubmitButton } from "../../../../../components/reusable/ui/action-btns";
import { useDispatch } from "react-redux";
import { clearOrderFilters, setModalFilters } from "../../../../../redux/features/ordersSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { OrderSources } from "../../../../../utils/orderSources";

dayjs.extend(utc);


const OrderFilterModal = ({ isLoading, setCurrentPage }) => {

    const allSources = OrderSources();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, isLoading: userLoading } = useGetAllUsers(1, 1000);
    const {
        assigned_by,
        created_by,
        print_status,
        sort_asc,
        start_date,
        end_date,
        scource,
    } = useSelector((state) => state.orderFilters);
    const [formData, setFormData] = useState({
        assign_by: null,
        created_by: null,
        print_status: null,
        sort_asc: false,
        start_date: null,
        end_date: null,
        scource: null,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isModalOpen) return;

        setFormData({
            assign_by: assigned_by ?? null,
            created_by: created_by ?? null,
            print_status: print_status ?? null,
            sort_asc: sort_asc ?? false,
            start_date: start_date ? dayjs(start_date) : null,
            end_date: end_date ? dayjs(end_date) : null,
            scource: scource ?? null,
        });
    }, [
        isModalOpen,
        assigned_by,
        created_by,
        print_status,
        sort_asc,
        start_date,
        end_date,
        scource,
    ]);



    // submit fn
    const handleSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);

        dispatch(
            setModalFilters({
                assigned_by: formData.assign_by || null,
                created_by: formData.created_by || null,
                scource: formData.scource || null,
                print_status:
                    formData.print_status === null ? null : formData.print_status,
                sort_asc: formData.sort_asc || false,
                start_date: formData.start_date
                    ? formData.start_date.utc().format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ")
                    : null,
                end_date: formData.end_date
                    ? formData.end_date.utc().format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ")
                    : null,
            })
        );

        setIsModalOpen(false);
    };

    // clear fn
    const handleClear = () => {
        setCurrentPage(1);
        setFormData({
            assign_by: null,
            created_by: null,
            print_status: null,
            sort_asc: false,
            start_date: null,
            end_date: null,
            scource: null,
        });

        dispatch(clearOrderFilters());
        setIsModalOpen(false);
    };


    const userOptions = data?.data?.map(user => ({
        label: user.name,
        value: user.id,
    })) || [];


    return (
        <>

            <button
                onClick={() => setIsModalOpen(true)}
                className="button !flex !items-center gap-2"
            >
                <TbFilter />
                Filter Orders
            </button>

            <Modal
                title="Filter Orders"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={500}
                destroyOnClose
            >
                <form onSubmit={handleSubmit} className="card !pt-2 w-full">
                    <div className="flex-1 grid grid-cols-1 gap-3">

                        <FormInput
                            label="Assigned By"
                            type="select"
                            value={formData.assign_by}
                            onChange={(value) =>
                                setFormData(prev => ({ ...prev, assign_by: value }))
                            }
                            options={userOptions}
                            placeholder="Select User"
                        />

                        <FormInput
                            label="Order Created By"
                            type="select"
                            value={formData.created_by}
                            onChange={(value) =>
                                setFormData(prev => ({ ...prev, created_by: value }))
                            }
                            options={userOptions}
                            placeholder="Select User"
                        />

                        <FormInput
                            label="Print Status"
                            type="select"
                            value={formData.print_status}
                            onChange={(value) =>
                                setFormData(prev => ({ ...prev, print_status: value }))
                            }
                            options={[{ label: "Printed", value: true }, { label: "Un-Printed", value: false }]}
                            placeholder="Select Print Status"
                        />

                        <FormInput
                            label="Sort Order"
                            type="select"
                            value={formData.sort_asc}
                            onChange={(value) =>
                                setFormData(prev => ({ ...prev, sort_asc: value }))
                            }
                            options={[
                                { label: "Old", value: true },
                                { label: "Latest", value: false },
                            ]}
                            placeholder="Select Sort"
                        />

                        <FormInput
                            label="Source"
                            type="select"
                            value={formData.scource}
                            onChange={(value) =>
                                setFormData(prev => ({ ...prev, scource: value }))
                            }
                            options={allSources}
                            placeholder="Select Source"
                        />

                        <FormInput
                            label="Start Date"
                            type="datepicker"
                            value={formData.start_date}
                            onChange={(date) =>
                                setFormData(prev => ({ ...prev, start_date: date }))
                            }
                        />

                        <FormInput
                            label="End Date"
                            type="datepicker"
                            value={formData.end_date}
                            onChange={(date) =>
                                setFormData(prev => ({ ...prev, end_date: date }))
                            }
                        />
                    </div>

                    <div className="flex justify-end items-center gap-2 pt-5">
                        {/* <button type="submit" className="button">
                            Filter
                        </button> */}
                        <SubmitButton btnText="Filter" loading={isLoading} disabled={isLoading} />
                        <button
                            type="button"
                            onClick={handleClear}
                            className="button !bg-red-600"
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default OrderFilterModal;
