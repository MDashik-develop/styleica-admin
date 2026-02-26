import React, { useState } from "react";
import { Modal, Tag } from "antd";
import { useGetSingleCustomer } from "../../../../customers/services/customerApi";
import SectionLoading from "../../../../../components/reusable/ui/section-loading";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";


const FraudCheckModal = ({ customerData = {} }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const customerId = isModalOpen ? customerData?.id : undefined;

    const { data: customer, isLoading } = useGetSingleCustomer(customerId);

    // console.log(customer);


    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className="text-red-600">
                <FaInfoCircle />
            </button>

            <Modal
                title={"Fraud Check - " + (customerData?.name || "")}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={750}
            >
                {
                    isLoading ?
                        <SectionLoading />
                        :
                        <>
                            {
                                customer?.fraudCheck?.status === "success" &&
                                <div className="space-y-3 max-h-[400px] pr-4 overflow-y-auto">
                                    <div>
                                        {/* <h3 className="sub-title">Courier Data</h3> */}

                                        {/* Summary */}
                                        {customer?.fraudCheck?.data?.summary && (
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-2">
                                                <p className="bg-blue-600 text-light p-3 text-center font-semibold">
                                                    Total Parcels: {customer?.fraudCheck?.data?.summary?.total_parcel ?? 0}
                                                </p>
                                                <p className="bg-green-600 p-3 text-light text-center font-semibold">
                                                    Successful Parcels: {customer?.fraudCheck?.data?.summary?.success_parcel ?? 0}
                                                </p>
                                                <p className="bg-red-600 text-light p-3 text-center font-semibold">
                                                    Cancelled Parcels: {customer?.fraudCheck?.data?.summary?.cancelled_parcel ?? 0}
                                                </p>
                                                <p className="bg-cyan-600 p-3 text-light text-center font-semibold">
                                                    Success Ratio: {customer?.fraudCheck?.data?.summary?.success_ratio ?? 0}%
                                                </p>
                                            </div>
                                        )}

                                        {/* Individual Couriers */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                            {customer?.fraudCheck?.data &&
                                                Object.entries(customer?.fraudCheck?.data)
                                                    .filter(([key]) => key !== "summary") // Exclude summary
                                                    .map(([key, courier], idx) => (
                                                        <div
                                                            key={idx}
                                                            className="p-2 border border-dark/20 rounded flex flex-col items-center text-center"
                                                        >
                                                            <p className="font-semibold">{courier?.name ?? "N/A"}</p>
                                                            <p className="text-sm text-gray-500">
                                                                Total Parcels: {courier?.total_parcel ?? 0}
                                                            </p>
                                                            <p className="text-sm text-green-600">
                                                                Success: {courier?.success_parcel ?? 0}
                                                            </p>
                                                            <p className="text-sm text-red-600">
                                                                Cancelled: {courier?.cancelled_parcel ?? 0}
                                                            </p>
                                                        </div>
                                                    ))}
                                        </div>
                                    </div>
                                </div>
                            }

                        </>
                }
            </Modal>
        </>
    );
};

export default FraudCheckModal;
