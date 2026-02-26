import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";
import CustomerManageModal from "../../components/customer-manage-modal";
import { useDeleteCustomer, useGetSingleCustomer, useGetSingleCustomerWithoutCache } from "../../services/customerApi";
import SectionLoading from "../../../../components/reusable/ui/section-loading";
import { Tag } from "antd";
import toast from "react-hot-toast";


const CustomerDetails = () => {

    const { id } = useParams();
    const { data: customer, isLoading } = useGetSingleCustomer(id);
    const { data: customerData, isLoadingCustomerData } = useGetSingleCustomerWithoutCache(id);
    const deleteCustomerMutation = useDeleteCustomer();
    const navigate = useNavigate();


    // delete customer fn
    const handleDeleteCustomer = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteCustomerMutation.mutate(id, {
                onSuccess: (res) => {
                    toast.success(res?.message || "User deleted successfully!");
                    navigate("/customers")
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed!")
                },
            });
        };
    };

    return (
        <div className="p-6 space-y-6">

            {
                isLoading ?
                    <SectionLoading />
                    :
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                        {/* Left content */}
                        <div className="card col-span-1 text-center space-y-4 h-fit">
                            <img
                                src={customerData?.image || "https://cdn-icons-png.flaticon.com/512/219/219983.png"}
                                alt={customerData?.name}
                                className="w-28 h-28 mx-auto rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold space-x-2 pb-1">
                                    <span className="text-lg">{customerData?.name}</span>
                                    <CopyToClipboard value={customerData?.name} className="mt-2" />
                                </p>
                                {/* <Link to={`mailto:${customer?.email}`} className="text-primary block space-x-1 my-1">
                                    <span> {customer?.email}</span>
                                    <CopyToClipboard value={customer?.name} />
                                </Link> */}
                                <p className="text-gray-500 space-x-1">
                                    <span>{customerData?.phone}</span>
                                    <CopyToClipboard value={customerData?.name} />
                                </p>
                            </div>

                            <div className="flex justify-center items-center gap-2">
                                <p>Label: {customerData?.label}</p>
                                <p>Type: <Tag color="blue">{customerData?.type}</Tag></p>
                            </div>

                            <div className="flex justify-center items-center gap-2">
                                <p><strong>Thana:</strong> {customerData?.thana}</p>
                                <p><strong>District:</strong> {customerData?.district}</p>
                            </div>

                            {/* Address */}
                            <div>
                                <h3 className="text-lg font-semibold">Address</h3>
                                <address className="not-italic opacity-70 text-xs md:text-sm pt-2">{customerData?.address}</address>
                            </div>

                            <div className="flex justify-center items-center gap-2">
                                <CustomerManageModal
                                    isEdit={true}
                                    customerData={customerData}
                                />
                                <button onClick={() => handleDeleteCustomer(customerData?.id)} className="button !bg-red-600">Delete</button>
                            </div>

                            {/* <div className="space-y-3 text-sm text-left border-t border-slate-300 pt-3">
                        <div>
                            <p className="font-semibold mb-1">Last Order:</p>
                            <p className="space-x-2">
                                <span className="opacity-70">{customer.lastOrder.date}</span>
                                <span className="opacity-70">-</span>
                                <Link className="text-primary">#{customer.lastOrder.orderId}</Link>
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold mb-1">Average Order Value:</p>
                            <p className="opacity-70"><CurrencyIcon />{customer.averageOrderValue}</p>
                        </div>
                        <div>
                            <p className="font-semibold mb-1">Registered:</p>
                            <p className="opacity-70">{customer.registered}</p>
                        </div>
                    </div> */}
                        </div>


                        {/* Right Side */}
                        <div className="col-span-1 lg:col-span-3 space-y-6">

                            {/* Courier Data Section */}
                            <div className="card">
                                <h3 className="sub-title">Courier Data</h3>

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



                            </div>



                        </div>
                    </div>
            }

        </div>
    );
};

export default CustomerDetails;
