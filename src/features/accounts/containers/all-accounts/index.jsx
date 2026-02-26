import React, { useState } from "react";
import AccountsFilter from "../../components/account-filters";
import OverviewAccount from "../../components/overview-account";
import RevenueAccount from "../../components/revenue-account";
import ExpenseAccount from "../../components/expense-account";
import ProfitAccount from "../../components/profit-account";
import TaxAccount from "../../components/tax-account";
import BalanceAccount from "../../components/balance-account";
import PayableAccount from "../../components/payable-account";
import ReceivableAccount from "../../components/receiveable-account";
import WarehouseAccount from "../../components/warehouse-account";


const AllAccounts = () => {

    const [active, setActive] = useState("overview");

    const renderAccount = () => {
        switch (active) {
            case "overview":
                return <OverviewAccount />;
            case "revenue":
                return <RevenueAccount />;
            case "expenses":
                return <ExpenseAccount />;
            case "profit":
                return <ProfitAccount />;
            case "warehouse":
                return <WarehouseAccount />;
            case "tax":
                return <TaxAccount />;
            case "balance sheet":
                return <BalanceAccount />;
            case "payable":
                return <PayableAccount />;
            case "receivable":
                return <ReceivableAccount />;
            default:
                return <div className="card p-6">Select an account to view details.</div>;
        }
    };

    return (
        <div>
            <AccountsFilter active={active} setActive={setActive} />

            <h2 className="bg-primary/90 py-3 text-center text-light text-xl lg:text-3xl font-bold capitalize mt-8 mb-5">
                {active}
            </h2>

            {renderAccount()}
        </div>
    );
};

export default AllAccounts;
