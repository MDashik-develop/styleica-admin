import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


// ------------------ API Calls ------------------ //

// Get all products
const getAllProducts = async (params = {}) => {
    const res = await axiosPrivate.get("/products/index", { params });
    return res.data;
};

const getSearchedProducts = async (search = "") => {
    const res = await axiosPrivate.get(`/products/search-suggest?search=${search}`,);
    return res.data;
};

// Create product
const createProduct = async (payload) => {
    const res = await axiosPrivate.post("/products/create", payload);
    return res.data;
};

// Get single product
const getSingleProduct = async (id) => {
    const res = await axiosPrivate.get(`/products/${id}/show`);
    return res.data;
};

// Update product
const updateProduct = async ({ id, payload }) => {
    const res = await axiosPrivate.put(`/products/${id}/update`, payload);
    return res.data;
};

// Delete product
const deleteProduct = async (id) => {
    const res = await axiosPrivate.delete(`/products/${id}/delete`);
    return res.data;
};


// Bulk product status change
const bulkStatusChange = async (payload) => {
    const res = await axiosPrivate.post(
        "/products/bulk-status-change",
        payload
    );
    return res.data;
};



// ------------------ React Query Hooks ------------------ //

// Get all products
export const useGetAllProducts = (params = {}) => {
    return useQuery({
        queryKey: ["products", params],
        queryFn: () => getAllProducts(params),
        keepPreviousData: true,
    });
};

export const useGetSeachedProducts = (search = "") => {
    return useQuery({
        queryKey: ["products", search],
        queryFn: () => getSearchedProducts(search),
    });
};


// Get single product
export const useGetSingleProduct = (id) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getSingleProduct(id),
        enabled: !!id,
    });
};

// Create product
export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => queryClient.invalidateQueries(["products"]),
    });
};

// Update product
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
        },
    });
};

// Delete product
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
        },
    });
};


// Bulk product status change
export const useBulkStatusChange = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: bulkStatusChange,
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
        },
    });
};