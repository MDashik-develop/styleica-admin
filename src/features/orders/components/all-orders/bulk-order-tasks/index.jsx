import React from "react";
import AssignUserModal from "./assign-user-modal";
import ChangeStatusModal from "./change-status-modal";
import CourierAssign from "./courier-assign";
import OrderPrintModal from "../../../containers/order-print";


const BulkOrderTasks = ({ selectedOrders, setSelectedOrders }) => {


    return (
        <div className="flex flex-wrap items-center gap-3 pt-4">
            <OrderPrintModal
                selectedOrders={selectedOrders}
                setSelectedOrders={setSelectedOrders}
            />
            <AssignUserModal
                selectedOrders={selectedOrders}
                setSelectedOrders={setSelectedOrders}
            />
            <ChangeStatusModal
                selectedOrders={selectedOrders}
                setSelectedOrders={setSelectedOrders}
            />
            <CourierAssign
                selectedOrders={selectedOrders}
                setSelectedOrders={setSelectedOrders}
            />
        </div>
    );
};

export default BulkOrderTasks;