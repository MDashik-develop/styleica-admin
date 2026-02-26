import React, { useState } from "react";
import ReportsFilter from "../../components/filters";
import OrderReport from "../../components/order-report";
import ReturnReport from "../../components/return-report";
import PaymentReport from "../../components/payment-report";
import RefundReport from "../../components/refund-report";
import CancellationReport from "../../components/cancellation-report";
import DisputeReport from "../../components/dispute-report";
import QueryFilters from "../../components/query-filters";


const ReportList = () => {

    const [active, setActive] = useState("orders");


    const renderReport = () => {
        switch (active) {
            case "orders":
                return <OrderReport />;
            case "returns":
                return <ReturnReport />;
            case "refunds":
                return <RefundReport />;
            case "cancellations":
                return <CancellationReport />;
            case "disputes":
                return <DisputeReport />;
            case "payments":
                return <PaymentReport />;
            default:
                return <div className="card p-6">Select a report type to view details.</div>;
        }
    };

    return (
        <div className="">

            <ReportsFilter active={active} setActive={setActive} />

            <h2 className="bg-primary/90 py-3 text-center text-light text-xl lg:text-3xl font-bold capitalize mt-8 mb-5">
                {active} Report
            </h2>

            <QueryFilters />

            <div>
                {renderReport()}
            </div>

        </div>
    );
};

export default ReportList;