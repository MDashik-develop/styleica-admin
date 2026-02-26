import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductTrash from "../product-trash";
import OrderTrash from "../order-trash";


const AllTrash = () => {

    const location = useLocation();
    const navigate = useNavigate();

    // Read tab from query string
    const searchParams = new URLSearchParams(location.search);
    const defaultTab = searchParams.get("product") || "order";

    const [active, setActive] = useState(defaultTab);

    const handleTabChange = (tab) => {
        setActive(tab);
        // Update URL query without reloading the page
        searchParams.set("tab", tab);
        navigate({ pathname: location.pathname, search: searchParams.toString() }, { replace: true });
    };

    const renderComponents = () => {
        switch (active) {
            case "product":
                return <ProductTrash />;
            case "order":
                return <OrderTrash />;
            default:
                return <div className="card p-6">Select a settings tab to view details.</div>;
        }
    };

    // Sync state if URL changes manually
    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab && tab !== active) setActive(tab);
    }, [location.search]);

    return (
        <div>
            {/* Tabs */}
            <div className="flex items-center gap-5">
                {[
                    { key: "product", label: "Product" },
                    // { key: "order", label: "Order" },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => handleTabChange(tab.key)}
                        className={`${active === tab.key ? "button" : "button-outline"}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Settings Component */}
            <div className="mt-5">{renderComponents()}</div>
        </div>
    );
};

export default AllTrash;