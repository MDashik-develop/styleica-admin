import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import FormInput from "../../../../../components/reusable/form-input";
import Media from "../../../../../components/reusable/media";
import toast from "react-hot-toast";
import { useCreateBrand, useUpdateBrand } from "../../../services/brandApi";
import { SubmitButton } from "../../../../../components/reusable/ui/action-btns";


const ManageBrand = ({ open, setOpen, editData, setEditData }) => {

    const [selectedMedia, setSelectedMedia] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    const createBrandMutation = useCreateBrand();
    const updateBrandMutation = useUpdateBrand();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        website: "",
        status: true,
        sort_order: 0,
        meta_title: "",
        meta_description: "",
    });

    const loading = createBrandMutation.isPending || createBrandMutation.isLoading ||
        updateBrandMutation.isPending || updateBrandMutation.isLoading;
    const btnText = editData ? "Update" : "Add Brand";

    // load initial data
    useEffect(() => {
        if (editData) {
            setFormData({
                name: editData?.name || "",
                description: editData?.description || "",
                website: editData?.website || "",
                status: editData?.status ?? true,
                sort_order: editData?.sort_order || 0,
                meta_title: editData?.meta_title || "",
                meta_description: editData?.meta_description || "",
            });

            setSelectedMedia([editData?.media] || []);
        } else {
            setFormData({
                name: "",
                description: "",
                website: "",
                status: true,
                sort_order: 0,
                meta_title: "",
                meta_description: "",
            });
            setSelectedMedia([]);
        }
    }, [editData, open]);

    // input change
    const handleInputChange = (e, name) => {
        setErrMessage("");

        let fieldName = name || e.target?.name;
        let fieldValue = e.target ? e.target.value : e;

        setFormData((prev) => ({
            ...prev,
            [fieldName]: fieldValue,
        }));
    };

    // submit fn
    const handleSubmit = (e) => {

        e.preventDefault();
        setErrMessage("");

        if (
            !formData.name ||
            !formData.description ||
            !formData.website ||
            formData.sort_order === "" ||
            !formData.meta_title ||
            !formData.meta_description ||
            selectedMedia.length === 0
        ) {
            setErrMessage("All fields are required!");
            return;
        }

        const payload = {
            ...formData,
            media_id: selectedMedia[0]?.id,
        };

        if (editData) {
            updateBrandMutation.mutate(
                { id: editData.id, payload },
                {
                    onSuccess: () => {
                        toast.success("Updated!");
                        closeModal();
                    },
                    onError: (err) => {
                        toast.error(err?.response?.data?.message || "Failed to update!");
                    },
                }
            );
        } else {
            createBrandMutation.mutate(payload, {
                onSuccess: (res) => {
                    toast.success("Brand Created!");
                    closeModal();
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed!");
                },
            });
        }

    };

    // Close modal and reset form input values
    const closeModal = () => {

        setFormData({
            name: "",
            description: "",
            website: "",
            status: true,
            sort_order: 0,
            meta_title: "",
            meta_description: "",
        });

        setSelectedMedia([]);

        setOpen(false);
        setEditData(null);
    };

    return (
        <Modal
            title={editData ? "Edit Brand" : "Add New Brand"}
            open={open}
            onCancel={closeModal}
            footer={null}
            centered
            width={550}
        >
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">

                    <FormInput
                        label="Brand Name"
                        name="name"
                        type="text"
                        placeholder="Enter brand name"
                        Required
                        value={formData.name}
                        onChange={handleInputChange}
                    />

                    <FormInput
                        label="Website"
                        name="website"
                        type="text"
                        placeholder="https://example.com"
                        Required
                        value={formData.website}
                        onChange={handleInputChange}
                    />

                    <div className="md:col-span-2">
                        <FormInput
                            label="Description"
                            name="description"
                            type="text"
                            placeholder="Enter description"
                            Required
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <FormInput
                        label="Sort Order"
                        name="sort_order"
                        type="number"
                        placeholder="Enter sort order"
                        Required
                        value={formData.sort_order}
                        onChange={handleInputChange}
                    />

                    <FormInput
                        label="Meta Title"
                        name="meta_title"
                        type="text"
                        placeholder="Enter meta title"
                        Required
                        value={formData.meta_title}
                        onChange={handleInputChange}
                    />

                    <FormInput
                        label="Meta Description"
                        name="meta_description"
                        type="text"
                        placeholder="Enter meta description"
                        Required
                        value={formData.meta_description}
                        onChange={handleInputChange}
                    />

                    <FormInput
                        label="Status"
                        name="status"
                        type="select"
                        value={formData.status}
                        options={[
                            { label: "Active", value: true },
                            { label: "Inactive", value: false },
                        ]}
                        placeholder="Select status"
                        Required
                        onChange={(value) => handleInputChange(value, "status")}
                    />

                    <div className="md:col-span-2 flex gap-2 pt-3">
                        <h4>Upload Media:</h4>
                        <Media selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} />
                    </div>
                </div>

                {errMessage && (
                    <p className="text-center text-red-600 pt-2">{errMessage}</p>
                )}

                <div className="flex justify-end gap-2 pt-4">
                    <button type="button" onClick={closeModal} className="button-outline">
                        Cancel
                    </button>
                    <SubmitButton btnText={btnText} loading={loading} />
                </div>
            </form>
        </Modal>
    );
};

export default ManageBrand;
