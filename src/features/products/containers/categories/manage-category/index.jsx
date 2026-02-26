import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import FormInput from "../../../../../components/reusable/form-input";
import Media from "../../../../../components/reusable/media";
import { useCreateCategory, useUpdateCategory } from "../../../services/categoryApi";
import toast from "react-hot-toast";
import { SubmitButton } from "../../../../../components/reusable/ui/action-btns";


const ManageCategory = ({ open, setOpen, editData, setEditData, allCategory }) => {

    const [selectedMedia, setSelectedMedia] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    const createCategoryMutation = useCreateCategory();
    const updateCategoryMutation = useUpdateCategory();
    const [formData, setFormData] = useState({
        name: "",
        status: true,
        description: "",
        meta_title: "",
        meta_description: "",
        sort_order: 0,
        parent_id: null,
    });

    const loading = createCategoryMutation.isPending || createCategoryMutation.isLoading ||
        updateCategoryMutation.isPending || updateCategoryMutation.isLoading;
    const btnText = editData ? "Update" : "Add Category";

    // load initial data for add / update
    useEffect(() => {
        if (editData) {
            setFormData({
                name: editData?.name || "",
                status: editData?.status ?? true,
                description: editData?.description || "",
                meta_title: editData?.meta_title || "",
                meta_description: editData?.meta_description || "",
                sort_order: editData?.sort_order || 0,
                parent_id: Number(editData?.parent_id) || null,
            });

            // prefill media
            setSelectedMedia([editData?.media] || []);
        } else {
            setFormData({
                name: "",
                status: true,
                description: "",
                meta_title: "",
                meta_description: "",
                sort_order: 0,
                parent_id: null,
            });
            setSelectedMedia([]);
        }
    }, [editData, open]);


    // onchange for inputs 
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

        if (!formData.name) {
            setErrMessage("Name field is required!");
            return;
        }

        if (!selectedMedia?.length) {
            setErrMessage("Media is required!");
            return;
        }

        const payload = {
            ...formData,
            media_id: selectedMedia[0]?.id,
            parent_id: formData.parent_id,
        };

        // console.log("payload", payload);


        if (editData) {
            updateCategoryMutation.mutate(
                { id: editData?.id, payload }, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Category Updated");
                    closeModal();
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed to update")
                },
            }
            );
        }
        else {
            createCategoryMutation.mutate(payload, {
                onSuccess: (res) => {
                    toast.success(res?.meesage || "Category Created")
                    closeModal();
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed")
                },
            });
        }
    };

    // CLOSE MODAL FUNCTION
    const closeModal = () => {
        setOpen(false);
        setEditData(null);

        setFormData({
            name: "",
            status: true,
            description: "",
            meta_title: "",
            meta_description: "",
            parent_id: 0,
        });

        setSelectedMedia([]);
    };

    // console.log("EditData:", editData);


    return (
        <Modal
            title={editData ? "Edit Category" : "Add New Category"}
            open={open}
            onCancel={() => {
                setOpen(false);
                setEditData(null);
            }}
            footer={null}
            centered
            width={500}
        >
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <FormInput
                        label="Category Name"
                        name="name"
                        type="text"
                        placeholder="Enter category name"
                        value={formData.name}
                        Required
                        onChange={handleInputChange}
                    />

                    <FormInput
                        label="Description"
                        name="description"
                        type="text"
                        value={formData.description}
                        placeholder="Enter description"
                        // Required
                        onChange={handleInputChange}
                    />

                    <FormInput
                        label="Meta Title"
                        name="meta_title"
                        type="text"
                        value={formData.meta_title}
                        placeholder="Enter meta title"
                        // Required
                        onChange={handleInputChange}
                    />

                    <FormInput
                        label="Meta Description"
                        name="meta_description"
                        type="text"
                        value={formData.meta_description}
                        placeholder="Enter meta description"
                        // Required
                        onChange={handleInputChange}
                    />

                    <div className="col-span-2 grid  grid-cols-3 md:grid-cols-3  gap-x-4">
                        <FormInput
                            label="Parent Category"
                            name="parent_id"
                            type="select"
                            value={formData.parent_id}
                            options={allCategory?.map((cat) => ({
                                label: cat.name,
                                value: cat.id,
                            }))}
                            placeholder="Select parent category"
                            onChange={(value) => handleInputChange(value, "parent_id")}
                        />

                        <FormInput
                            label="Sort Order"
                            name="sort_order"
                            type="number"
                            value={formData.sort_order}
                            placeholder="Enter sort order"
                            // Required
                            onChange={handleInputChange}
                        />

                        <FormInput
                            label="Status"
                            name="status"
                            type="select"
                            value={formData?.status}
                            options={[
                                { label: "Active", value: true },
                                { label: "Inactive", value: false },
                            ]}
                            placeholder="Select status"
                            Required
                            onChange={(value) => handleInputChange(value, "status")}
                        />
                    </div>

                    <div className="col-span-2 flex gap-2 pt-3">
                        <h4>Upload Media:</h4>
                        <Media selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} />
                    </div>

                </div>

                {errMessage &&
                    <p className="text-center text-red-600 pt-2">{errMessage}</p>}

                <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setOpen(false)} className="button-outline">Cancel</button>
                    <SubmitButton btnText={btnText} loading={loading} />
                </div>
            </form>
        </Modal>
    );
};

export default ManageCategory;
