import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls ------------------ //

// Get all category
const getAllCategory = async ({ page = 1, pagination = 10 }) => {
    const res = await axiosPrivate.get("/categories/index", { params: { page, pagination, }, });
    return res.data;
};

// Create category
const createCategory = async (payload) => {
    const res = await axiosPrivate.post("/categories/create", payload);
    return res.data;
};

// Update category
const updateCategory = async ({ id, payload }) => {
    const res = await axiosPrivate.put(`/categories/${id}/update`, payload);
    return res.data;
};

// Delete category
const deleteCategory = async (id) => {
    const res = await axiosPrivate.delete(`/categories/${id}/delete`);
    return res.data;
};

// ------------------ React Query Hooks ------------------ //

// Get all category
export const useGetAllCategory = ({ page = 1, pagination = 10 }) => {
    return useQuery({
        queryKey: ["category", page, pagination],
        queryFn: () => getAllCategory({ page, pagination }),
    });
};

// Create category
export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCategory,
        onSuccess: () => queryClient.invalidateQueries(["category"]),
    });
};

// Update category
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCategory,
        onSuccess: () => queryClient.invalidateQueries(["category"]),
    });
};

// Delete category
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries(["category"]);
        },
    });
};

