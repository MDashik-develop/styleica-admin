import React, { useEffect, useState } from "react";
import FormInput from "../../../../../components/reusable/form-input";
import { Spin, Tag } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useGetSingleCustomer, useGetSingleCustomerWithoutCache, useSearchCustomerByNumber } from "../../../../customers/services/customerApi";
import CustomerManageModal from "../../../../customers/components/customer-manage-modal";


const OrderCustomer = ({ selectedCustomer, setSelectedCustomer, createdCustomerData, setCreatedCustomerData, isEditMode }) => {

    const [number, setNumber] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [courierData, setCourierData] = useState(null);
    const { data: customers, isLoading } = useSearchCustomerByNumber(number);
    const { data: singleCustomer, isLoading: customerLoading } = useGetSingleCustomer(selectedCustomer?.id);
    const { data: singleCustomerData, isLoading: customerDataLoading } = useGetSingleCustomerWithoutCache(selectedCustomer?.id);


    useEffect(() => {
        if (!singleCustomer) return;

        if (createdCustomerData) {
            setNumber("");
            setCourierData(createdCustomerData?.fourdfraudCheck?.data || null);
        } else {
            setCourierData(singleCustomer?.fraudCheck?.data || null);
        }
    }, [singleCustomer, createdCustomerData]);


    const handleChange = (e) => {
        setCreatedCustomerData(null);
        setNumber(e.target.value);
        setSelectedCustomer(null);
        setShowDropdown(true);
    };

    const handleSelect = (customer) => {
        setSelectedCustomer(customer);
        setNumber(customer.phone);
        setShowDropdown(false);
    };

    const couriers = courierData
        ? Object.entries(courierData).filter(([key]) => key !== "summary")
        : [];

    const summary = courierData?.summary;


    // console.log(singleCustomerData);


    return (
        <div className="relative w-full">

            {/* Customer Search / Add btn */}
            <div className="flex items-end">
                <div className="flex-1">
                    <FormInput
                        label="Search Customer"
                        placeholder="Ex: 017XXXXXXXXX"
                        value={number}
                        onChange={handleChange}
                        disabled={isEditMode}
                    />
                </div>

                {
                    !isEditMode &&
                    <div className="pb-1">
                        <CustomerManageModal
                            iconBtn={true}
                            createdCustomerData={setCreatedCustomerData}
                        />
                    </div>
                }

            </div>

            {/* Dropdown */}
            {(showDropdown && !createdCustomerData) && (
                <div className="absolute z-50 bg-white border border-gray-300 w-full max-h-60 overflow-auto mt-1 rounded-sm shadow-md">
                    {isLoading ? (
                        <div className="flex justify-center p-4">
                            <Spin indicator={<LoadingOutlined spin />} />
                        </div>
                    ) : customers?.length > 0 ? (
                        customers.map((customer) => (
                            <button
                                key={customer.id}
                                onClick={() => handleSelect(customer)}
                                type="button"
                                className="block w-full text-left p-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {customer.name} - {customer.phone}
                            </button>
                        ))
                    ) : (
                        <li className="p-2 text-gray-500">No numbers found</li>
                    )}
                </div>
            )}

            {/* Selected Customer Info */}
            {selectedCustomer && (
                <div className="bg-light p-2 space-y-4 text-base">

                    {/* Courier Stats */}
                    <div className="w-full overflow-x-auto custom-scrollbar">
                        <table className="w-full text-[10px] 2xl:text-xs text-gray-700 border border-slate-200">
                            <thead className="bg-primary/10">
                                <tr>
                                    <th className="text-left p-1">Courier</th>
                                    <th className="p-1 text-center">Total</th>
                                    <th className="p-1 text-center text-green-600">Success</th>
                                    <th className="p-1 text-center text-pink-600">Cancel</th>
                                    <th className="p-1 text-center text-primary">Success Ratio</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Loading row */}
                                {customerLoading && (
                                    <tr>
                                        <td colSpan={5} className="text-center p-2 text-gray-500">
                                            <Spin indicator={<LoadingOutlined spin />} className="!py-3" />
                                        </td>
                                    </tr>
                                )}

                                {/* Courier rows */}
                                {!customerLoading &&
                                    couriers.map(([key, courier]) => (
                                        <tr key={key} className="border-b border-slate-300">
                                            <td className="p-1 flex items-center gap-1">
                                                <img
                                                    src={courier.logo}
                                                    alt={courier.name}
                                                    className="w-4 h-4 object-contain"
                                                />
                                                {courier.name}
                                            </td>

                                            <td className="text-center p-1">
                                                {courier.total_parcel}
                                            </td>

                                            <td className="text-center p-1 text-green-600">
                                                {courier.success_parcel}
                                            </td>

                                            <td className="text-center p-1 text-pink-600">
                                                {courier.cancelled_parcel}
                                            </td>

                                            <td className="text-center p-1 text-primary">
                                                {courier.success_ratio}%
                                            </td>
                                        </tr>
                                    ))
                                }

                                {/* Summary row (LAST) */}
                                {!customerLoading && summary && (
                                    <tr className="font-semibold bg-primary/5 border-t border-slate-300">
                                        <td className="p-1">Total</td>
                                        <td className="text-center p-1">
                                            {summary.total_parcel}
                                        </td>
                                        <td className="text-center p-1 text-green-600">
                                            {summary.success_parcel}
                                        </td>
                                        <td className="text-center p-1 text-pink-600">
                                            {summary.cancelled_parcel}
                                        </td>
                                        <td className="text-center p-1 text-primary">
                                            {summary.success_ratio}%
                                        </td>
                                    </tr>
                                )}

                                {/* Empty state */}
                                {!customerLoading && couriers.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center p-2 text-gray-500">
                                            No courier data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                    {/* Selected Customer Edit */}
                    {
                        singleCustomerData &&
                        <CustomerManageModal
                            isEdit={true}
                            customerData={singleCustomerData}
                        />
                    }

                    {/* Customer Details */}
                    <div>
                        <p className="opacity-70 text-sm">Customer Name</p>
                        <p>{singleCustomerData?.name}</p>
                    </div>
                    <div>
                        <p className="opacity-70 text-sm">Mobile Number</p>
                        <p>{singleCustomerData?.phone}</p>
                    </div>
                    <div>
                        <p className="opacity-70 text-sm">District</p>
                        <p>{singleCustomerData?.district}</p>
                    </div>
                    <div>
                        <p className="opacity-70 text-sm">Address</p>
                        <p>{singleCustomerData?.address}</p>
                    </div>
                    <div>
                        <p className="opacity-70 text-sm">Type</p>
                        <Tag color={singleCustomerData?.type == "Fraud" ? "red" : "blue"}>{singleCustomerData?.type}</Tag>
                    </div>
                    <div>
                        <p className="opacity-70 text-sm">Note</p>
                        <p>{singleCustomerData?.note}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderCustomer;
