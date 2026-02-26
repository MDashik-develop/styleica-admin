import React, { useState } from "react";
import { useGetAllCouriers } from "../../../../../courier/services/courierApi";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useSendBulkCourier } from "../../../../services/bulkOrdersApi";
import toast from "react-hot-toast";


const CourierAssign = ({ selectedOrders }) => {

    const { data, isLoading } = useGetAllCouriers();
    const [loading, setLoading] = useState(false);
    const sendBulkCourier = useSendBulkCourier();

    const hasAssignedCourier = selectedOrders?.some(order => order?.courier_orders);

    const handleCourierAssign = (courierSlug) => {

        if (!selectedOrders?.length) {
            toast.error("Please select at least one order");
            return;
        }

        if (hasAssignedCourier) {
            toast.error("Some orders already have courier assigned");
            return;
        }

        setLoading(true);

        const payload = {
            orders: selectedOrders.map(order => ({
                customer_name: order?.customer?.name || "",
                phone: order?.customer?.phone || "",
                address: order?.customer?.address || "",
                cod_amount: Number(order?.total_amount || 0),
                shipping_charge: Number(order?.shipping_amount || 0),
                merchant_order_id: order?.id,
                notes: order?.logs?.[0]?.note || "",
                items: order?.items?.map(item => ({
                    product_id: item?.product?.id,
                    name: item?.product?.name,
                    price: Number(item?.unit_price || item?.product?.price || 0),
                    media: {
                        url: item?.product?.media_url || item?.product?.image || "",
                    },
                })) || [],
            })),
        };

        // console.log(payload, "payload");


        sendBulkCourier.mutate(
            { courierSlug, payload },
            {
                onSuccess: (res) => {
                    console.log("Bulk courier success:", res);
                    if (res?.status == "success") {
                        setLoading(false);
                        toast.success(res?.message || "Send to courier");
                        return;
                    }
                    else if (res?.status == "failed") {
                        setLoading(false);
                        toast.error(res?.message || "Send to courier");
                        return;
                    };
                    setLoading(false);
                    toast.success(res?.message || "");
                },
                onError: (err) => {
                    console.error("Bulk courier error:", err);
                    setLoading(false);
                    toast.error(err?.response?.data?.message || "Failed");
                },
            }
        );
    };

    // console.log(hasAssignedCourier);



    if (isLoading) {
        return <Spin indicator={<LoadingOutlined spin />} size="small" />;
    }

    return (
        <div className="flex flex-wrap items-center gap-3 pl-3 border-l-4 border-l-dark/40 relative">
            {data?.data?.map(courier => (
                <button key={courier?.id} className="button !bg-white px-2 py-0.5 border border-gray-400 !rounded-full flex items-center gap-2 capitalize" onClick={() => handleCourierAssign(courier?.code)} disabled={selectedOrders?.length == 0 || loading}>
                    {courier?.media_url && (
                        <img
                            src={courier.media_url}
                            alt={courier.name}
                            className="w-16 h-6 object-contain"
                        />
                    )}
                </button>
            ))}

            {/* loading */}
            {loading &&
                <span className="absolute top-2 left-1/2 -translate-x-1/2">
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </span>}

        </div>
    );
};

export default CourierAssign;
