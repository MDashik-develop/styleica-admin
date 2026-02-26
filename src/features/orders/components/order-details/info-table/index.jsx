import React from "react";
import Table from "../../../../../components/reusable/table";
import { CurrencyIcon } from "../../../../../components/reusable/ui/common-icons";


const InfoTable = ({ order }) => {

    if (!order || !order.items) return null;

    const items = order?.items.map((item, index) => {
        // Safely parse ordered_attributes
        let orderedAttrs = {};
        if (item?.ordered_attributes) {
            try {
                orderedAttrs = typeof item.ordered_attributes === "string"
                    ? JSON.parse(item.ordered_attributes)
                    : item.ordered_attributes;
            } catch (err) {
                console.warn("Failed to parse ordered_attributes", err);
                orderedAttrs = {};
            }
        }

        // Safely map attributes
        const attributes = Object.keys(orderedAttrs).length > 0
            ? Object.entries(orderedAttrs).map(([key, val]) => ({
                attribute_name: key || "---",
                value_name: val?.value || val || "---",
            }))
            : Array.isArray(item?.attributes)
                ? item.attributes.map(attr => ({
                    attribute_name: attr?.attribute_name || "---",
                    value_name: attr?.value_name || attr?.value || "---",
                }))
                : [];

        return {
            key: index + 1,
            sku: item?.sku || "---",
            image: item?.media?.urls?.small || null,
            productName: item?.name || "Unnamed Product",
            attributes,
            price: Number(item?.unit_price || 0),
            requestedQuantity: Number(item?.quantity || 0),
            discount: Number(item?.discount_amount || 0),
        };
    });



    // headers
    const headers = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image) =>
                image ? (
                    <img
                        src={image}
                        alt="product"
                        className="w-14 h-14 object-cover rounded-md"
                    />
                ) : (
                    <span className="text-gray-400">No Image</span>
                ),
        },
        {
            title: "Product Name",
            dataIndex: "productName",
            key: "productName",
            render: (text, record) => (
                <div>
                    <p className="font-semibold">{text}</p>
                    {record.attributes.length > 0 && (
                        <p className="text-gray-500 text-sm">
                            {record.attributes
                                .map((attr) => `${attr.attribute_name}: ${attr.value_name}`)
                                .join(", ")}
                        </p>
                    )}
                </div>
            ),
        },
        { title: "SKU", dataIndex: "sku", key: "sku" },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => <span><CurrencyIcon />{price.toFixed(2)}</span>,
        },
        {
            title: "Quantity",
            dataIndex: "requestedQuantity",
            key: "requestedQuantity",
        },
        {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
            render: (discount) => <span><CurrencyIcon />{discount.toFixed(2)}</span>,
        },
        {
            title: "Sub-Total",
            key: "total",
            render: (_, record) => {
                const total = record.price * record.requestedQuantity - record.discount;
                return <strong><CurrencyIcon />{total.toFixed(2)}</strong>;
            },
        },
    ];

    // summary
    const summary = () => {
        let subtotal = 0;
        let totalDiscount = 0;

        items.forEach((item) => {
            subtotal += item.price * item.requestedQuantity;
            totalDiscount += item.discount;
        });

        const totalReceivable =
            subtotal - totalDiscount + Number(order.shipping_amount || 0);

        return (
            <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={5}>
                    <div className="font-semibold text-right pr-6 space-y-1">
                        <div>Sub-total</div>
                        <div>Discount</div>
                        <div>Shipping</div>
                        <div>Total Receivable</div>
                    </div>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} colSpan={2}>
                    <div className="font-semibold text-right pr-4 space-y-1">
                        <div><CurrencyIcon />{subtotal.toFixed(2)}</div>
                        <div><CurrencyIcon />{totalDiscount.toFixed(2)}</div>
                        <div><CurrencyIcon />{Number(order.shipping_amount || 0).toFixed(2)}</div>
                        <div className="text-green-600"><CurrencyIcon />{totalReceivable.toFixed(2)}</div>
                    </div>
                </Table.Summary.Cell>
            </Table.Summary.Row>
        );
    };


    return (
        <div>
            <Table
                headers={headers}
                data={items}
                pagination={false}
                enableFilters={false}
                enableSelection={false}
                summary={summary}
            />
        </div>
    );
};

export default InfoTable;
