import React, { useState } from "react";
import { Form } from "antd";
import FormInput from "../../../../../components/reusable/form-input";

const pageOptions = [
    { value: 'home', label: 'Home' },
    { value: 'shop', label: 'Shop' },
    { value: 'about', label: 'About' },
];

const paymentByOptions = [
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Card' },
    { value: 'bkash', label: 'bKash' },
];

const courierOptions = [
    { value: 'sundarban', label: 'Sundarban' },
    { value: 'pathao', label: 'Pathao' },
    { value: 'redx', label: 'RedX' },
];

const PreOrderForm = ({ type = "Pre-Order", initialValues = {} }) => {
    const [formData, setFormData] = useState({
        subtotal: '',
        discountType: '',
        discount: '',
        shippingArea: '',
        deliveryCharge: '',
        grandTotal: '',
        paidAmount: '',
        dueAmount: '',
        paymentBy: '',
        courier: '',
        page: '',
        customerNotes: '',
        customerNumber: '',
        ...initialValues
    });

    const handleChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (values) => {
        const data = { ...formData, ...values };
        console.log("Submitted:", data);
    };

    return (
        <div className="card">
            <h2 className="bg-slate-200 text-lg lg:text-xl text-center font-semibold py-3 mb-5 capitalize">
                {initialValues?.id ? "Edit" : "Create"} {type}
            </h2>

            <Form
                onFinish={handleSubmit}
                initialValues={formData}
                layout="vertical"
                className="!space-y-4"
            >
                <FormInput
                    label="Customer Number"
                    name="customerNumber"
                    type="number"
                    required
                    placeholder="Enter Customer Number"
                    onChange={e => handleChange("customerNumber", e.target.value)}
                />
                <FormInput
                    label="Subtotal"
                    name="subtotal"
                    type="number"
                    required
                    placeholder="Enter subtotal"
                    onChange={e => handleChange("subtotal", e.target.value)}
                />
                <FormInput
                    label="Discount Type"
                    name="discountType"
                    type="select"
                    options={[{ value: "flat", label: "Flat" }, { value: "percent", label: "Percent" }]}
                    required
                    placeholder="Select discount type"
                    onChange={value => handleChange("discountType", value)}
                />
                <FormInput
                    label="Discount"
                    name="discount"
                    type="number"
                    required
                    placeholder="Enter discount amount"
                    onChange={e => handleChange("discount", e.target.value)}
                />
                <FormInput
                    label="Shipping Area"
                    name="shippingArea"
                    type="text"
                    required
                    placeholder="Enter shipping area"
                    onChange={e => handleChange("shippingArea", e.target.value)}
                />
                <FormInput
                    label="Delivery Charge"
                    name="deliveryCharge"
                    type="number"
                    required
                    placeholder="Enter delivery charge"
                    onChange={e => handleChange("deliveryCharge", e.target.value)}
                />
                <FormInput
                    label="Grand Total"
                    name="grandTotal"
                    type="number"
                    required
                    placeholder="Enter grand total"
                    onChange={e => handleChange("grandTotal", e.target.value)}
                />
                <FormInput
                    label="Paid Amount"
                    name="paidAmount"
                    type="number"
                    required
                    placeholder="Enter paid amount"
                    onChange={e => handleChange("paidAmount", e.target.value)}
                />
                <FormInput
                    label="Due Amount"
                    name="dueAmount"
                    type="number"
                    required
                    placeholder="Enter due amount"
                    onChange={e => handleChange("dueAmount", e.target.value)}
                />
                <FormInput
                    label="Payment By"
                    name="paymentBy"
                    type="select"
                    options={paymentByOptions}
                    required
                    placeholder="Select payment method"
                    onChange={value => handleChange("paymentBy", value)}
                />
                <FormInput
                    label="Courier"
                    name="courier"
                    type="select"
                    options={courierOptions}
                    required
                    placeholder="Select courier"
                    onChange={value => handleChange("courier", value)}
                />
                <FormInput
                    label="Page"
                    name="page"
                    type="select"
                    options={pageOptions}
                    required
                    placeholder="Select page"
                    onChange={value => handleChange("page", value)}
                />
                <FormInput
                    label="Customer Notes"
                    name="customerNotes"
                    type="textarea"
                    placeholder="Enter any notes for customer"
                    onChange={e => handleChange("customerNotes", e.target.value)}
                />

                <button type="submit" className="button w-full mt-6 mx-auto">
                    {initialValues?.id ? "Update Pre-Order" : "Create Pre-Order"}
                </button>
            </Form>
        </div>
    );
};

export default PreOrderForm;
