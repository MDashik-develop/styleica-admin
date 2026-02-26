import React, { useEffect, useState } from "react";
import { Form } from "antd";
import FormInput from "../../../../../components/reusable/form-input";
import { useGetAllShipping } from "../../../../settings/services/shippingApi";
import { useGetAllPayments } from "../../../../settings/services/paymentApi";
import { SubmitButton } from "../../../../../components/reusable/ui/action-btns";
import OrderSummary from "../order-summary";
import toast from "react-hot-toast";
import { useCreateOrder, useUpdateOrder } from "../../../services/orderApi";
import { useNavigate } from "react-router-dom";
import { paymentStatus } from "../../../../../utils/paymentStatus";
import { OrderSources } from "../../../../../utils/orderSources";


const OrderCheckout = ({ selectedCustomer, selectedProducts, isEditMode, orderData }) => {

    const { data: allShippingMethod } = useGetAllShipping();
    const { data: allPaymentMethod } = useGetAllPayments();
    const allPaymentStatus = paymentStatus();
    const allSources = OrderSources();
    const createOrder = useCreateOrder();
    const updateOrder = useUpdateOrder();
    const navigate = useNavigate();
    const [discountAmount, setDiscountAmount] = useState(0);
    const [formData, setFormData] = useState({
        payment_method: null,
        shipping_id: null,
        discount_amount: 0,
        paid_amount: 0,
        payment_status: null,
        source: null,
        note: null,
    });

    useEffect(() => {
        if (isEditMode && orderData) {
            setFormData({
                payment_method: orderData?.payment_method || null,
                shipping_id: Number(orderData?.shipping_details?.shipping_id) || null,
                discount_amount: Number(orderData?.discount_amount) || 0,
                paid_amount: orderData?.paid_amount || 0,
                payment_status: orderData?.payment_status || null,
                source: orderData?.source_utm || null,
                note: orderData?.note || null,
            });
        }
    }, [orderData, isEditMode]);

    const loading = createOrder.isLoading || updateOrder.isLoading || createOrder.isPending;
    const btnText = isEditMode ? "Update Order" : "Create Order";

    // input change fn
    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // order submit fn
    const handleSubmit = (e) => {

        e.preventDefault();

        if (!selectedCustomer) {
            toast.error("Customer not selected");
            return;
        }
        if (!formData.payment_method) {
            toast.error("Payment method is required");
            return;
        }
        if (!formData.shipping_id) {
            toast.error("Shipping method is required");
            return;
        }
        if (!formData.source) {
            toast.error("Source is required");
            return;
        }
        if (selectedProducts.length === 0) {
            toast.error("No products selected");
            return;
        }

        const payload = {
            payment_method: formData.payment_method || "",
            shipping_id: Number(formData?.shipping_id) || 0,
            discount_amount: Number(formData.discount_amount) || 0,
            source_utm: formData?.source,
            note: formData?.note,
            items: selectedProducts.map(product => ({
                ...(isEditMode && { id: product.id }),
                product_id: Number(product.product_id),
                variant_id: product.variant_id ? Number(product.variant_id) : null,
                variant_attributes: Array.isArray(product.attributes)
                    ? product.attributes.reduce((acc, attr) => {
                        acc[attr.name] = attr.value; // only value, key-value JSON
                        return acc;
                    }, {})
                    : {},
                quantity: Number(product.quantity) || 1
            })),
            ...(!isEditMode && { customer_id: selectedCustomer.id }),
            ...(isEditMode && { payment_status: formData.payment_status }),
        };

        // console.log("Order Payload:", payload);

        // return;

        if (isEditMode) {
            updateOrder.mutate({ id: orderData.id, payload }, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Order updated");
                    navigate("/orders");
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed");
                },
            });
        }
        else {
            createOrder.mutate(payload, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Order created");
                    navigate("/orders");
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed");
                },
            });
        }
    };

    // console.log(allShippingMethod);


    return (
        <div className="flex justify-end pt-5">

            <form onSubmit={handleSubmit} className="space-y-4 max-w-[300px] w-full">
                <div className="grid grid-cols-1 gap-x-3">
                    <FormInput
                        label="Payment Method"
                        name="payment_method"
                        type="select"
                        value={formData.payment_method}
                        options={
                            allPaymentMethod?.map(method => ({ value: method.slug, label: method.name })) || []
                        }
                        Required
                        placeholder="Select payment method"
                        onChange={(value) => handleChange("payment_method", value)}
                    />

                    <FormInput
                        label="Shipping Method"
                        name="shipping_id"
                        type="select"
                        value={formData.shipping_id}
                        options={
                            allShippingMethod?.map(method => ({ value: method.id, label: method.name })) || []
                        }
                        Required
                        placeholder="Select shipping method"
                        onChange={(value) => handleChange("shipping_id", value)}
                    />

                    <FormInput
                        label="Source"
                        name="source"
                        type="select"
                        value={formData.source}
                        options={
                            allSources
                        }
                        Required
                        placeholder="Select Order source"
                        onChange={(value) => handleChange("source", value)}
                    />

                    {/* <FormInput
                        label="Source"
                        name="source"
                        value={formData.source}
                        placeholder="Enter Order source"
                        onChange={(e) => handleChange("source", e.target.value)}
                    /> */}

                    {
                        isEditMode &&
                        <FormInput
                            label="Payment Status"
                            name="payment_status"
                            type="select"
                            value={formData.payment_status}
                            options={
                                allPaymentStatus?.map(status => ({ value: status.value, label: status.label })) || []
                            }
                            Required
                            placeholder="Select payment status"
                            onChange={(value) => handleChange("payment_status", value)}
                        />
                    }

                    <FormInput
                        label="Discount Amount"
                        name="discount_amount"
                        type="number"
                        value={formData.discount_amount}
                        placeholder="Enter discount amount"
                        onChange={(e) => handleChange("discount_amount", e.target.value)}
                    />

                    <FormInput
                        label="Note"
                        name="note"
                        type="textarea"
                        value={formData.note}
                        placeholder="Enter customer note"
                        onChange={(e) => handleChange("note", e.target.value)}
                    />

                    <OrderSummary
                        selectedProducts={selectedProducts}
                        paidAmount={Number(formData.paid_amount) || 0}
                        shippingAmount={
                            Number(
                                allShippingMethod?.find(method => String(method.id) === String(formData.shipping_id))
                                    ?.base_charge
                            ) || 0
                        }
                        discountAmount={Number(formData.discount_amount) || 0}
                    />

                </div>

                <div className="flex justify-center">
                    <SubmitButton btnText={btnText} loading={loading} />
                </div>
            </form>
        </div>
    );
};

export default OrderCheckout;
