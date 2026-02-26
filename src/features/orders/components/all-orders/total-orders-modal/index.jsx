import React, { useState } from "react";
import { Modal, Tag } from "antd";
import { useGetSingleCustomer } from "../../../../customers/services/customerApi";
import SectionLoading from "../../../../../components/reusable/ui/section-loading";
import { Link } from "react-router-dom";


const TotalOrdersModal = ({ customerData = {} }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const customerId = isModalOpen ? customerData?.id : undefined;

    const { data, isLoading } = useGetSingleCustomer(customerId);


    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-fit mx-auto text-primary border border-slate-300 px-2 py-[2px]"
            >
                Total Orders ({customerData?.total_orders})
            </button>

            <Modal
                title={`${customerData?.name} — Total Orders (${customerData?.total_orders || 0})`}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={750}
            >
                {
                    isLoading ?
                        <SectionLoading />
                        :
                        <div className="space-y-3 max-h-[400px] overflow-y-auto">
                            {data?.orders?.map((order) => (
                                <div
                                    key={order?.id}
                                    className="border border-slate-200 rounded-md p-3 flex justify-between items-center"
                                >
                                    <div>
                                        <Link to={`/orders/${order?.id}`} className="!text-primary font-semibold">{order?.invoice_no}</Link>
                                        <p className="text-sm text-slate-500">
                                            Date: {order?.date} · Items: {order?.items?.length}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-semibold">
                                            ৳ {order?.total_amount}
                                        </p>
                                        <Tag color={order?.order_status?.color || "default"}>
                                            {order?.order_status?.name}
                                        </Tag>
                                    </div>
                                </div>
                            ))}
                        </div>
                }
            </Modal>
        </>
    );
};

export default TotalOrdersModal;
