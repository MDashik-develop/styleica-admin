import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls ------------------ //

// Get all shipping methods
const getAllShipping = async () => {
    const res = await axiosPrivate.get("/shipping/index");
    return res.data;
};

// Create shipping method
const createShipping = async (payload) => {
    const res = await axiosPrivate.post("/shipping/create", payload);
    return res.data;
};

// Update shipping method
const updateShipping = async ({ id, payload }) => {
    const res = await axiosPrivate.put(`/shipping/${id}/update`, payload);
    return res.data;
};

// Delete shipping method
const deleteShipping = async (id) => {
    const res = await axiosPrivate.delete(`/shipping/${id}/delete`);
    return res.data;
};

// ------------------ React Query Hooks ------------------ //

// Get all shipping methods
export const useGetAllShipping = () => {
    return useQuery({
        queryKey: ["shipping"],
        queryFn: getAllShipping,
    });
};

// Create shipping method
export const useCreateShipping = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createShipping,
        onSuccess: () => queryClient.invalidateQueries(["shipping"]),
    });
};

// Update shipping method
export const useUpdateShipping = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateShipping,
        onSuccess: () => queryClient.invalidateQueries(["shipping"]),
    });
};

// Delete shipping method
export const useDeleteShipping = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteShipping,
        onSuccess: () => queryClient.invalidateQueries(["shipping"]),
    });
};
