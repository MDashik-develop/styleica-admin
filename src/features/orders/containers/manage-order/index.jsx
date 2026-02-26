import React, { useEffect, useState } from "react";
import OrderCustomer from "../../components/create-order/order-customer";
import OrderProducts from "../../components/create-order/order-products";
import OrderCheckout from "../../components/create-order/order-checkout";
import { useParams } from "react-router-dom";
import { useGetSingleOrder } from "../../services/orderApi";


const ManageOrder = () => {

    const { id } = useParams();
    const isEditMode = !!id;
    const { data: orderData, isLoading } = useGetSingleOrder(id);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [createdCustomerData, setCreatedCustomerData] = useState(null)
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        if (createdCustomerData?.data) {
            setSelectedCustomer(createdCustomerData.data);
        }
    }, [createdCustomerData]);

    useEffect(() => {
        if (isEditMode && orderData) {
            setSelectedCustomer(orderData?.customer);

            const mappedItems = orderData?.items?.map(item => {
                let orderedAttrs = {};
                if (item?.ordered_attributes) {
                    if (typeof item.ordered_attributes === "string") {
                        try {
                            orderedAttrs = JSON.parse(item.ordered_attributes);
                        } catch (err) {
                            console.warn("Failed to parse ordered_attributes", err);
                            orderedAttrs = {};
                        }
                    } else if (typeof item.ordered_attributes === "object") {
                        orderedAttrs = item.ordered_attributes;
                    }
                }

                const hasOrderedAttrs = Object.keys(orderedAttrs).length > 0;

                return {
                    id: item?.order_item_id,
                    product_id: item?.product_id,
                    variant_id: item?.product_variant_id,
                    name: item?.name,
                    sku: item?.sku,
                    price: item?.unit_price,
                    quantity: item?.quantity,
                    media: item?.media,
                    allAttributes: item?.attributes.map(attr => ({
                        id: attr.attribute_id,
                        name: attr.attribute_name,
                        value: attr.value,
                        color_code: attr.color_code,
                        value_id: attr.value_id,
                    })),
                    attributes: hasOrderedAttrs
                        ? Object.entries(orderedAttrs).map(([key, val]) => {
                            // val can be string or object {id, value}
                            let matchValue = val;
                            let id = null;
                            let value_id = null;
                            let color_code = null;

                            if (typeof val === "object" && val !== null) {
                                matchValue = val.value;
                                id = val.id || null;
                                value_id = val.id || null;
                            }

                            // Find matching attribute in allAttributes
                            const match = (item.attributes || []).find(
                                attr => attr.attribute_name === key && attr.value === matchValue
                            );

                            return {
                                id: match?.attribute_id || id,
                                name: key,
                                value: matchValue,
                                color_code: match?.color_code || color_code,
                                value_id: match?.value_id || value_id,
                            };
                        })
                        : (item?.attributes || []).map(attr => ({
                            id: attr.attribute_id,
                            name: attr.attribute_name,
                            value: attr.value,
                            color_code: attr.color_code,
                            value_id: attr.value_id,
                        })),
                };
            });

            setSelectedProducts(mappedItems);
        }
    }, [orderData, isEditMode]);


    // console.log(orderData);
    // console.log(selectedProducts, "selected");



    return (
        <div>

            <h2 className="title">{isEditMode ? "Edit" : "Create New"} Order</h2>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">

                <div className="md:col-span-2 bg-slate-50 p-3 border border-slate-200">
                    <OrderCustomer
                        selectedCustomer={selectedCustomer}
                        setSelectedCustomer={setSelectedCustomer}
                        createdCustomerData={createdCustomerData}
                        setCreatedCustomerData={setCreatedCustomerData}
                        isEditMode={isEditMode}
                    />
                </div>
                <div className="md:col-span-5 card">
                    <OrderProducts
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts} />
                    <OrderCheckout
                        selectedCustomer={selectedCustomer}
                        selectedProducts={selectedProducts}
                        isEditMode={isEditMode}
                        orderData={isEditMode ? orderData : null}
                    />
                </div>

            </div>

        </div>
    );
};

export default ManageOrder;