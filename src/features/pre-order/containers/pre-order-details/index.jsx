import React from "react";
import { useParams, Link } from "react-router-dom";
import { Tag } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { EditIcon } from "../../../../components/reusable/ui/common-icons";
import PreOrderInvoice from "../../components/pre-order-invoice";
import Print from "../../../../components/reusable/print";
import PreOrderInfo from "../../components/pre-order-details/pre-order-info";
import PreOrderItems from "../../components/pre-order-details/pre-order-items";
import PreOrderExtraInfo from "../../components/pre-order-details/pre-order-extra-info";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";


const dummyOrder = {
    id: 1,
    invoice: "#PRE-2001",
    createdAt: "05 Oct, 2025",
    expectedDelivery: "25 Oct, 2025",
    status: "pending",
    note: "Pre-order item arriving soon",
    customer: {
        name: "Tanzina Akter",
        mobile: "01799001122",
        address: "Dhanmondi, Dhaka",
    },
    pickup: "Genters Fashion, Dhanmondi",
    courier: {
        name: "Pathao",
        image: "https://i.ibb.co.com/4xR6G1M/pathao.jpg",
        area: "Dhaka",
        fee: 120,
        type: "prepaid",
    },
    payment: {
        total: 3200,
        advance: 500,
        due: 2700,
        method: "bKash",
    },
    items: [
        {
            id: 1,
            image:
                "https://i.ibb.co.com/CKTCvTh0/h.jpg",
            name: "Summer Floral Dress",
            code: "PRD123456",
            attributes: "Color: Red, Size: M",
            price: 1200,
            quantity: 2,
        },
        {
            id: 2,
            image:
                "https://i.ibb.co.com/CKTCvTh0/h.jpg",
            name: "Denim Jacket",
            code: "PRD123457",
            attributes: "Color: Blue, Size: L",
            price: 800,
            quantity: 1,
        },
    ],
};


const PreOrderDetails = () => {

    const { id } = useParams();
    const order = dummyOrder;

    const invoiceData = {
        ...order,
        date: { created: order.createdAt },
        partner: { deliveryArea: order.courier.area },
        payment: { ...order.payment, sale: order.payment.total },
        deliveryFee: { amount: order.courier.fee },
    };

    const statusColors = {
        pending: "orange",
        on_hold: "gold",
        confirmed: "green",
        processing: "blue",
        cancelled: "volcano",
    };

    return (
        <div className="space-y-8">
            {/* ===== Header ===== */}
            <div className="flex justify-between items-center flex-wrap gap-3">

                <div className="flex items-center gap-3">
                    <h2 className="title !pb-0">{order.invoice}</h2>
                    <CopyToClipboard value={order?.invoice} />
                    <Tag color={statusColors[order.status]} className="capitalize">
                        {order.status.replace("_", " ")}
                    </Tag>
                </div>

                <div className="flex gap-3 items-center">
                    <div id={`preorder-print-${order.id}`} className="hidden">
                        <PreOrderInvoice order={invoiceData} />
                    </div>
                    <Print value={`preorder-print-${order.id}`} className={"!text-xl"} />
                    <Link to={`/pre-orders/manage/${order.id}`} className="button">
                        Edit
                    </Link>
                </div>

            </div>

            {/* Sections */}
            <PreOrderInfo order={order} />
            <PreOrderItems order={order} />
            <PreOrderExtraInfo order={order} />
        </div>
    );
};

export default PreOrderDetails;
