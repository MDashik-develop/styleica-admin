import React, { useState } from "react";
import { Modal } from "antd";
import Print from "../../../../components/reusable/print";
import OrderInvoice from "../../components/order-invoice";
import { useOrderPrintStatusChange } from "../../services/bulkOrdersApi";
import toast from "react-hot-toast";


const OrderPrintModal = ({ selectedOrders, setSelectedOrders }) => {

    const [open, setOpen] = useState(false);
    const orderPrintStatusChange = useOrderPrintStatusChange();

    const btnLoading =
        orderPrintStatusChange.isLoading ||
        orderPrintStatusChange.isPending;

    const handlePrintIntent = () => {
        if (!selectedOrders.length) return;

        const payload = {
            ids: selectedOrders.map(order => order.id),
            print_status: true,
        };

        orderPrintStatusChange.mutate(payload, {
            onSuccess: (res) => {
                toast.success(res?.message || "Orders marked as printed");
                setSelectedOrders([]);
                setOpen(false);
            },
            onError: (err) => {
                toast.error(
                    err?.response?.data?.message ||
                    "Failed to update print status"
                );
            },
        });
    };


    return (
        <>
            {/* Open modal button */}
            <button
                className="button !rounded-full"
                onClick={() => setOpen(true)}
                disabled={!selectedOrders?.length}
            >
                Print
            </button>

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                width={900}
                title="Print Order Invoices"
                destroyOnClose
            >
                {/* ✅ Print button */}
                <div className="w-fit mx-auto mb-4">
                    <Print
                        value="multi-order-print"
                        btnText={btnLoading ? "Printing..." : "Print"}
                        className="bg-primary !text-light !px-4 !py-1"
                        onBeforePrint={handlePrintIntent}
                    />
                </div>

                {/* Preview area */}
                <div className="max-h-[65vh] overflow-y-auto p-3 rounded bg-gray-50">
                    {selectedOrders.map(order => (
                        <div key={order.id} className="bg-white mb-6">
                            <OrderInvoice order={order} />
                        </div>
                    ))}
                </div>

                {/* Hidden print container */}
                <div id="multi-order-print" className="hidden">
                    {selectedOrders.map((order, index) => (
                        <div key={order.id}>
                            <OrderInvoice order={order} />

                            {index !== selectedOrders.length - 1 && (
                                <div style={{ pageBreakAfter: "always" }} />
                            )}
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    );
};

export default OrderPrintModal;
