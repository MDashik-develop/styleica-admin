import { Modal, Form } from "antd";
import React, { useEffect } from "react";
import FormInput from "../../../../../components/reusable/form-input";

const PageManageModal = ({ openModal, setOpenModal, initialValues = null, onSubmit }) => {

    const [form] = Form.useForm();

    useEffect(() => {
        if (openModal) {
            form.setFieldsValue(initialValues || { name: "" });
        }
    }, [initialValues, openModal, form]);

    const handleSubmit = (values) => {
        onSubmit(values);
        setOpenModal(false);
        form.resetFields();
    };

    return (
        <Modal
            title=""
            centered
            open={openModal}
            onCancel={() => {
                setOpenModal(false);
                form.resetFields();
            }}
            footer={null}
        >
            <h2 className="text-base xl:text-2xl font-semibold pb-5">
                {initialValues ? "Update Page" : "Add New Page"}
            </h2>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="flex flex-col gap-y-3"
            >
                <FormInput
                    label="Page Name"
                    name="name"
                    Required
                    placeholder="Enter page name"
                />

                <button type="submit" className="button mx-auto !mt-2">
                    {initialValues ? "Update" : "Save"}
                </button>
            </Form>
        </Modal>
    );
};

export default PageManageModal;
