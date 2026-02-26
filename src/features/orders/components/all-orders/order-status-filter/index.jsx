import React, { useEffect, useState } from "react";
import { useGetAllOrderStatus } from "../../../services/orderStatusApi";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { setStatusFilters } from "../../../../../redux/features/ordersSlice";
import { useSelector } from "react-redux";


const OrderStatusFilter = ({ orderData }) => {

    const { status, internal_note, same_numbers_orders } = useSelector((state) => state.orderFilters);

    const [activeId, setActiveId] = useState(status || 0);
    const [activeQuery, setActiveQuery] = useState(internal_note || "");
    const [multipleOrderFilter, setMultipleOrderFilter] =
        useState(!!same_numbers_orders);

    const { data: allStatus, isLoading } = useGetAllOrderStatus();

    const dispatch = useDispatch();

    useEffect(() => {
        setActiveId(status || 0);
        setActiveQuery(internal_note || "");
        setMultipleOrderFilter(!!same_numbers_orders);
    }, [status, internal_note, same_numbers_orders]);

    const statusTabs = [
        { id: 0, label: "All Orders", internal_notes: [] },
        ...(allStatus?.map((status) => ({
            id: status.id,
            label: status.name,
            slug: status.slug,
            internal_notes: status.internal_notes || [],
        })) || []),
    ];

    const activeFilter = statusTabs.find((tab) => tab.id === activeId);


    useEffect(() => {
        dispatch(
            setStatusFilters({
                status: activeId === 0 ? "" : activeId,
                internal_note: activeQuery || "",
                same_numbers_orders: multipleOrderFilter || false,
            })
        );
    }, [activeId, activeQuery, multipleOrderFilter]);


    // console.log("orderData", orderData);
    // console.log("status", allStatus);


    return (
        <>
            {
                isLoading ?
                    <div className="flex items-center gap-2">
                        <p>Loading Status</p>
                        <Spin indicator={<LoadingOutlined spin />} size="small" />
                    </div>
                    :
                    <div className="space-y-3">

                        {/* Top Tabs */}
                        <div className="flex items-center flex-wrap gap-2 md:gap-6 pt-2">
                            {statusTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveId(tab.id);
                                        setActiveQuery("");
                                    }}
                                    className={`flex items-center gap-x-1.5 px-2 py-1.5 text-sm 2xl:text-base border border-slate-100 transition-all duration-200 ${activeId === tab.id ? "bg-primary text-light" : "bg-transparent text-gray-700 border-slate-400"
                                        }`}>
                                    <p>{tab.label}</p>
                                    <div className={`w-fit h-5 ${activeId === tab.id ? " bg-light text-dark" : "bg-primary text-light"} px-1 flex justify-center items-center font-bold rounded-sm text-xs`}>
                                        {orderData?.all_status_orders?.[tab.id === 0 ? "All Orders" : tab.slug] || 0}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Internal Notes */}
                        <div>

                            <div className="flex flex-wrap items-center gap-3">
                                <div onClick={() => setMultipleOrderFilter(!multipleOrderFilter)} className={`w-fit flex items-center gap-1 border ${multipleOrderFilter ? "border-primary bg-primary text-light" : "bg-light border-slate-300 text-dark"} p-2 cursor-pointer`}>
                                    <p>Multiple Orders</p>
                                    <div className="px-1 py-0.5 bg-green-600 text-light flex justify-center items-center font-bold text-xs rounded-sm">
                                        {orderData?.total_orders_of_multiple_same_customers || 0}
                                    </div>
                                    <p>with the same phone number</p>
                                    <div className="px-1 py-0.5 bg-yellow-500 flex justify-center items-center font-bold rounded-sm">
                                        {orderData?.total_customers_with_multiple_orders || 0}
                                    </div>
                                </div>
                                {activeFilter?.internal_notes?.map((note, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveQuery(note.content)}
                                        className={`${activeQuery === note.content ? "bg-slate-300" : "bg-transparent"
                                            } flex items-center gap-2 border border-slate-300 px-3 py-1.5 text-sm`}
                                    >
                                        <span>{note.content}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default OrderStatusFilter;
