import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import General from "../general";
import Roles from "../roles";
import Pages from "../pages";
import AllShipping from "../shipping/all-shipping";
import AllPayment from "../payment/all-payment";
import AllArea from "../area/all-area";

const AllSettings = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Read tab from query string
    const searchParams = new URLSearchParams(location.search);
    const defaultTab = searchParams.get("tab") || "roles";

    const [active, setActive] = useState(defaultTab);

    const handleTabChange = (tab) => {
        setActive(tab);
        // Update URL query without reloading the page
        searchParams.set("tab", tab);
        navigate({ pathname: location.pathname, search: searchParams.toString() }, { replace: true });
    };

    const renderComponents = () => {
        switch (active) {
            // case "general":
            //     return <General />;
            case "roles":
                return <Roles />;
            // case "pages":
            //     return <Pages />;
            case "shipping":
                return <AllShipping />;
            case "payment":
                return <AllPayment />;
            case "area":
                return <AllArea />;
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
                    // { key: "general", label: "General Settings" },
                    { key: "roles", label: "Roles" },
                    // { key: "pages", label: "Pages" },
                    { key: "shipping", label: "Shipping Method" },
                    { key: "payment", label: "Payment Method" },
                    { key: "area", label: "Area" },
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

export default AllSettings;
