import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/product-form";
import { useCreateProduct, useGetSingleProduct, useUpdateProduct } from "../../services/productsApi";
import toast from "react-hot-toast";
import SectionLoading from "../../../../components/reusable/ui/section-loading";


const ManageProduct = () => {

    const { id } = useParams();
    const isEdit = !!id;
    const { data: productRes, isLoading } = useGetSingleProduct(id);
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();
    const navigate = useNavigate();

    const btnLoading = createProduct.isLoading || createProduct.isPending || updateProduct.isLoading || updateProduct.isPending;


    // add - update submit fn
    const handleSubmit = (payload) => {
        if (isEdit) {
            updateProduct.mutate(
                { id, payload },
                {
                    onSuccess: (res) => {
                        // console.log("p up", res);
                        toast.success(res?.message || "Product Updated");
                        navigate("/products")
                    },
                    onError: (err) => {
                        // console.log("p up err", err);
                        toast.error(err?.response?.data?.message || "Update failed!");
                    },
                }
            );
        } else {
            createProduct.mutate(payload, {
                onSuccess: (res) => {
                    // console.log("p res", res);
                    toast.success(res?.message || "Product Created");
                    navigate("/products")
                },
                onError: (err) => {
                    // console.log("p err", err);
                    toast.error(err?.response?.data?.message || "Create failed!")
                },
            });
        }
    };


    return (
        <div>
            <h2 className="title">
                {isEdit ? "Edit Product" : "Add New Product"}
            </h2>
            {
                isLoading ?
                    <SectionLoading />
                    :
                    <ProductForm
                        editData={productRes}
                        onSubmit={handleSubmit}
                        isEdit={isEdit}
                        btnLoading={btnLoading}
                    />
            }
        </div>
    );
};

export default ManageProduct;
