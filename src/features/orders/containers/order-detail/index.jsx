import React, { useState } from "react";
import { Segmented } from 'antd';
import OrderLogs from "../../components/order-details/order-logs";
import OrderInfo from "../../components/order-details/order-info";
import InfoTable from "../../components/order-details/info-table";
import OrderPayments from "../../components/order-details/order-payments";
import { useParams } from "react-router-dom";
import { useGetSingleOrder } from "../../services/orderApi";
import SectionLoading from "../../../../components/reusable/ui/section-loading";


const OrderDetails = () => {

    const { id } = useParams();
    const { data, isLoading } = useGetSingleOrder(id);
    const [activeTab, setActiveTab] = useState("Details");



    return (
        <div>

            <h2 className="title">Order Details</h2>
            <Segmented
                value={activeTab}
                onChange={setActiveTab}
                options={["Details", "Logs"]}
            />

            {
                isLoading ?
                    <SectionLoading />
                    :
                    <div className="pt-5">
                        {
                            activeTab == "Details" ?
                                <div>
                                    <OrderInfo order={data} />
                                    <InfoTable items={data?.items} order={data} />
                                    {/* <OrderPayments /> */}
                                </div>
                                :
                                <div>
                                    <OrderLogs logs={data?.logs} />
                                </div>
                        }
                    </div>
            }

        </div>
    );
};

export default OrderDetails;