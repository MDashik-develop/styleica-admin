import React, { useState } from "react";
import OrderStatusFilter from "../../components/all-orders/order-status-filter";
import { Tag } from "antd";
import Table from "../../../../components/reusable/table";
import { CurrencyIcon, EditIcon, WhatsappIcon } from "../../../../components/reusable/ui/common-icons";
import { Link } from "react-router-dom";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";
import Print from "../../../../components/reusable/print";
import OrderInvoice from "../../components/order-invoice";
import { useDeleteOrder, useGetAllOrders } from "../../services/orderApi";
import Pagination from "../../../../components/reusable/pagination";
import { DeleteButton } from "../../../../components/reusable/ui/action-btns";
import toast from "react-hot-toast";
import OrderFilter from "../../components/all-orders/order-filter";
import BulkOrderTasks from "../../components/all-orders/bulk-order-tasks";
import OrderLogsModal from "../../components/all-orders/order-logs-modal";
import TotalOrdersModal from "../../components/all-orders/total-orders-modal";
import FraudCheckModal from "../../components/all-orders/fraud-check-modal";
import OrderFilterModal from "../../components/all-orders/order-filter-modal";
import { useSelector } from "react-redux";


const AllOrders = () => {

    const [selectedOrders, setSelectedOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showData, setShowData] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const deleteOrder = useDeleteOrder();
    const filters = useSelector((state) => state.orderFilters);
    const { data, isLoading } = useGetAllOrders({
        page: currentPage,
        paginate: showData,
        query: searchQuery,

        status: filters.status,
        internal_note: filters.internal_note,
        same_numbers_orders: filters.same_numbers_orders,

        assigned_by: filters.assigned_by,
        created_by: filters.created_by,
        print_status: filters.print_status,
        sort_asc: filters.sort_asc,
        start_date: filters.start_date,
        end_date: filters.end_date,
        scource: filters.scource,
    });


    // Headers
    const headers = [
        {
            title: "Invoice No", dataIndex: "invoice_no", key: "invoice_no", render: (invoice_no, record) =>
                <div>
                    <div className="flex justify-center items-center gap-2">
                        <CopyToClipboard value={invoice_no} />
                        <div id="order-print-data" className="hidden">
                            <OrderInvoice order={record} />
                        </div>
                        <Print value="order-print-data" />
                        <Link to={`/orders/manage/${record?.id}`}><EditIcon /></Link>
                        <OrderLogsModal logs={record?.logs} />
                    </div>
                    <Link to={`/orders/${record?.id}`} className="py-1 block !text-primary">{invoice_no}</Link>
                    <div>
                        {record?.source_utm ?
                            <Tag color="blue" className="uppercase !mb-2">{record?.source_utm}</Tag>
                            :
                            <p className="!mb-2">N/A</p>
                        }
                    </div>
                    <Tag color={record?.print_status ? "green" : "red"}>
                        {record?.print_status ? "Printed" : "Un-Printed"}
                    </Tag>
                </div>

        },
        {
            title: "Placed & Assigned", dataIndex: "created_by", key: "created_by", render: (_, record) =>
                <>
                    <p><strong>Created:</strong> {record?.created_by?.name ? record?.created_by?.name : "N/A"}</p>
                    <p>
                        <strong>Assigned:</strong> {record?.assign?.name || "N/A"}
                    </p>
                </>
        },
        {
            title: "Date & Time",
            dataIndex: "created_at",
            key: "created_at",
            render: (_, record) => {
                const date = new Date(record.created_at);
                const formattedDate = date.toLocaleDateString("en-GB");
                const formattedTime = date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    // second: "2-digit",
                    hour12: true,
                });

                return (
                    <div className="min-w-20">
                        <p>{formattedDate}</p>
                        <p>{formattedTime}</p>
                    </div>
                );
            }
        },
        {
            title: "Customer",
            dataIndex: "customer",
            key: "customer",
            render: (customer) => (
                <div className="max-w-40 space-y-0.5">
                    <p className="text-primary font-semibold">{customer?.name}</p>

                    {
                        customer?.type &&
                        <div className="flex justify-center items-center">
                            <Tag
                                color={
                                    customer?.type === "Good"
                                        ? "green"
                                        : customer?.type === "Risky"
                                            ? "red"
                                            : customer?.type === "Excellent"
                                                ? "blue"
                                                : "cyan"
                                }
                                className="uppercase"
                            >
                                {customer?.type} - {customer?.label}%
                            </Tag>
                        </div>
                    }

                    <div className="flex justify-center items-center gap-1">
                        <Link to={`tel:${customer?.phone}`}>{customer?.phone}</Link>
                        <CopyToClipboard value={customer?.phone} />
                        <Link to={`https://wa.me/${customer?.phone}`} target="_blank">
                            <WhatsappIcon />
                        </Link>
                        <FraudCheckModal customerData={customer} />
                    </div>

                    <p>{customer?.address}</p>
                    {
                        customer?.total_orders && <TotalOrdersModal customerData={customer} />

                    }
                </div>
            ),
        },
        {
            title: "Products", dataIndex: "items", key: "items", render: (_, record) =>
                <div className="text-left max-w-40 space-y-3">
                    {record?.items?.map((item, index) => (
                        <div key={index} className="border-b border-b-slate-200 pb-3 last:border-b-0 last:pb-0">
                            <h3>{item?.product?.name}</h3>
                            <div className="flex items-center gap-1 pt-1">
                                <img src={item?.product?.media?.urls?.small} className="max-w-10 h-fit" alt={item?.product?.name || "image"} />
                                <div className="text-xs 2xl:text-sm space-y-2">
                                    <p><strong>Qty:</strong> {item?.quantity}</p>
                                    {item?.variant_attributes &&
                                        typeof item.variant_attributes === "object" &&
                                        Object.keys(item.variant_attributes).length > 0 && (
                                            <div className="space-y-1">
                                                {Object.entries(item.variant_attributes).map(([key, value]) => (
                                                    <p key={key}>
                                                        <strong>{key}:</strong> {value ?? "-"}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
        },
        {
            title: "Payment Info", dataIndex: "payments", key: "payments", render: (_, record) =>
                <>
                    <p>Method: <Tag className="uppercase">{record?.payments[0]?.payment_method}</Tag></p>
                    <p className="my-1">Status: <Tag className="uppercase">{record?.payments[0]?.status}</Tag></p>
                    <p>Transaction ID: <Tag className="uppercase">{record?.payments[0]?.transaction_id}</Tag></p>
                </>
        },
        {
            title: "Courier", dataIndex: "courier_orders", key: "courier_orders", render: (courier_orders) => {
                return courier_orders ? (
                    <>
                        <img
                            src={courier_orders?.courier?.media_url}
                            className="w-full max-h-5 object-contain"
                            alt="Courier Logo"
                        />

                        <p className="mt-1"><Tag className="uppercase">{courier_orders?.status}</Tag></p>
                        <p>COD Charge: {courier_orders?.cod_charge}</p>
                        <p>Shipping Charge: {courier_orders?.shipping_charge}</p>
                        {courier_orders?.tracking_code &&
                            <p>Tracking:
                                <Link to={`https://steadfast.com.bd/t/${courier_orders?.tracking_code}`} target="_blank" className="text-primary ml-1">
                                    {courier_orders?.tracking_code}
                                </Link>
                            </p>
                        }
                        <p>Merchant Order ID: {courier_orders?.merchant_order_id}</p>
                        <p>Consignment ID: {courier_orders?.consignment_id}</p>
                    </>
                ) : (
                    <p>No Courier</p>
                );

            }
        },
        {
            title: "Amounts", dataIndex: "subtotal", key: "subtotal", render: (_, record) =>
                <div className="text-left">
                    <p>Discount: <CurrencyIcon />{record?.discount_amount}</p>
                    <p>Subtotal: <CurrencyIcon />{record?.subtotal}</p>
                    <p>Tax: <CurrencyIcon />{record?.tax_amount}</p>
                    <p>Shipping: <CurrencyIcon />{record?.shipping_amount}</p>
                    <p className="font-semibold text-base text-green-600">Total: <CurrencyIcon />{record?.total_amount}</p>
                </div>
        },
        {
            title: "Status",
            dataIndex: "order_status",
            key: "order_status",
            render: (order_status) =>
                <Tag color={order_status?.color} className="capitalize">
                    {order_status?.name}
                </Tag>
            ,
        },
        // {
        //     title: "Action",
        //     key: "action",
        //     render: (_, record) => (
        //         <DeleteButton onClick={() => handleDelete(record.id)} />
        //     ),
        // },
    ];

    // order delete fn
    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteOrder.mutate(id, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Order deleted");
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed to delete");
                }
            });
        }
    };

    // console.log("order data:", data);


    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="title">Orders</h2>
                <div className="flex items-center gap-3">
                    <Link to={"/orders/status"} className="button-outline">Order Status</Link>
                    <Link to={"/orders/manage"} className="button">Create Order</Link>
                </div>
            </div>

            {/* Status Filter */}
            <div className="mb-1">
                <OrderStatusFilter
                    orderData={data}
                />
            </div>

            {/* Order Filters */}
            {/* <OrderFilter1
                setOrderFilters={setOrderFilters}
                setCurrentPage={setCurrentPage}
            /> */}
            <div className="flex flex-col md:flex-row md:justify-between items-center gap-0 pt-3 md:pt-0">
                <div className="order-2 md:order-1">
                    <BulkOrderTasks
                        selectedOrders={selectedOrders}
                        setSelectedOrders={setSelectedOrders}
                    />
                </div>
                <div className="order-1 md:order-2">
                    <OrderFilterModal
                        isLoading={isLoading}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="mt-5">
                <Table
                    tableName="My Orders"
                    loading={isLoading}
                    headers={headers}
                    data={data?.orders?.data}
                    enableSelection={true}
                    showDataFilter={true}
                    onShowDataChange={(value) => {
                        setShowData(Number(value));
                        setCurrentPage(1);
                    }}
                    onSearchChange={(value) => {
                        setSearchQuery(value);
                        setCurrentPage(1);
                    }}
                    searchPlaceholder="Ex: name, number, invoice"
                    selectedRows={selectedOrders}        // ✅ parent state controls
                    onSelectRows={setSelectedOrders}     // ✅ updates parent state
                />
                <Pagination
                    paginationMeta={data?.orders}
                    onPaginationChange={(page) => setCurrentPage(page)}
                />
            </div>
        </>
    );
};

export default AllOrders;
