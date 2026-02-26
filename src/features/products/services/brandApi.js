import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls ------------------ //

// Get all brands
const getAllBrands = async (page = 1) => {
    const res = await axiosPrivate.get(`/brands?page=${page}`);
    return res.data;
};

// Create brand
const createBrand = async (payload) => {
    const res = await axiosPrivate.post("/brands/create", payload);
    return res.data;
};

// Update brand
const updateBrand = async ({ id, payload }) => {
    const res = await axiosPrivate.put(`/brands/${id}/update`, payload);
    return res.data;
};

// Delete brand
const deleteBrand = async (id) => {
    const res = await axiosPrivate.delete(`/brands/${id}/delete`);
    return res.data;
};

// ------------------ React Query Hooks ------------------ //

// Get all brands
export const useGetAllBrands = (page = 1) => {
    return useQuery({
        queryKey: ["brands", page],
        queryFn: () => getAllBrands(page),
    });
};

// Create brand
export const useCreateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBrand,
        onSuccess: () => queryClient.invalidateQueries(["brands"]),
    });
};

// Update brand
export const useUpdateBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateBrand,
        onSuccess: () => queryClient.invalidateQueries(["brands"]),
    });
};

// Delete brand
export const useDeleteBrand = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteBrand,
        onSuccess: () => {
            queryClient.invalidateQueries(["brands"]);
        },
    });
};
