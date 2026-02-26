import React, { useState } from "react";
import { Modal } from "antd";
import FormInput from "../../../../components/reusable/form-input";
import { useCreateCustomer, useGetAllDistrict, useUpdateCustomer } from "../../services/customerApi";
import toast from "react-hot-toast";
import { SubmitButton } from "../../../../components/reusable/ui/action-btns";
import { FaPlusCircle } from "react-icons/fa";


const CustomerManageModal = ({
    isEdit = false,
    customerData = null,
    iconBtn = false,
    createdCustomerData = null,
}) => {

    const [visible, setVisible] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const createCustomerMutation = useCreateCustomer();
    const updateCustomerMutation = useUpdateCustomer();
    const { data: allDistrict, isLoading } = useGetAllDistrict();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        thana: "",
        district: "",
    });


    const loading = createCustomerMutation.isPending || createCustomerMutation.isLoading ||
        updateCustomerMutation.isPending || updateCustomerMutation.isLoading;
    const btnText = isEdit ? "Update" : "Add Customer";

    // Open modal & set data
    const openModal = () => {
        if (isEdit && customerData) {
            setFormData({
                name: customerData.name || "",
                // email: customerData.email || "",
                phone: customerData.phone || "",
                address: customerData.address || "",
                thana: customerData.thana || "",
                district: customerData.district || "",
            });
        } else {
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                thana: "",
                district: "",
            });
        }

        setVisible(true);
    };

    // Handle input change
    const handleChange = (e) => {
        setErrMessage("");
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Submit payload
    const handleSubmit = (e) => {

        e.preventDefault();
        setErrMessage("");

        // Validation
        if (!formData.name || !formData.phone || !formData.address) {
            return setErrMessage("Please fill required fields");
        };

        // BD phone number validation
        const bdPhonePattern = /^01\d{9}$/; // starts with 01 and total 11 digits
        if (!bdPhonePattern.test(formData.phone)) {
            return setErrMessage("Type a valid Bangladeshi phone number");
        }

        // console.log(formData);

        // return;

        if (isEdit && customerData?.id) {
            updateCustomerMutation.mutate(
                { id: customerData.id, payload: formData },
                {
                    onSuccess: (res) => {
                        toast.success(res?.message || "Customer Updated");
                        setVisible(false);
                    },
                    onError: (err) => {
                        toast.error(err?.response?.data?.message || "Failed to update");
                    },
                }
            );
        } else {
            createCustomerMutation.mutate(formData, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Customer added successfully!");
                    setVisible(false);
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed to add customer!");
                },
            });
        }
    };

    const districtOptions = allDistrict?.map(d => ({
        label: d.district_name,
        value: d.district_name,
    })) || [];

    const selectedDistrict = allDistrict?.find(
        d => d.district_name === formData.district
    );

    const thanaOptions = selectedDistrict?.thanas?.map(t => ({
        label: t.thana_name,
        value: t.thana_name,
    })) || [];



    return (
        <>
            <button className={`button ${iconBtn && "!py-[9px]"}`} onClick={openModal}>
                {isEdit ? "Edit"
                    :
                    <>{iconBtn ? <FaPlusCircle className="" /> : "+ Add Customer"}</>
                }
            </button>

            <Modal
                title={isEdit ? "Edit Customer" : "Add Customer"}
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                width={500}
            >
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                        <FormInput
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            Required
                        />

                        {/* <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                        /> */}

                        <FormInput
                            label="Phone"
                            name="phone"
                            type="number"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone"
                            Required
                        />

                        <FormInput
                            label="District"
                            name="district"
                            type="select"
                            value={formData.district}
                            options={districtOptions}
                            onChange={(value) => {
                                setFormData(prev => ({
                                    ...prev,
                                    district: value,
                                    thana: "",
                                }));
                            }}
                            placeholder="Select District"
                        />

                        <FormInput
                            label="Thana"
                            name="thana"
                            type="select"
                            value={formData.thana}
                            options={thanaOptions}
                            onChange={(value) =>
                                setFormData(prev => ({ ...prev, thana: value }))
                            }
                            placeholder={
                                formData.district ? "Select Thana" : "Select district first"
                            }
                            disabled={!formData.district}
                        />

                        <div className="md:col-span-2">
                            <FormInput
                                label="Full Address"
                                name="address"
                                type="textarea"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter full address"
                                Required
                            />
                        </div>
                    </div>

                    <p className="err-msg">{errMessage}</p>

                    <div className="flex justify-end items-center gap-3 mt-5">
                        <button type="button" className="button-outline" onClick={() => setVisible(false)}>
                            Cancel
                        </button>
                        <SubmitButton btnText={btnText} loading={loading} />
                        {/* <button className="button" onClick={handleSubmit}>
                            {isEdit ? "Update" : "Add Customer"}
                        </button> */}
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default CustomerManageModal;
