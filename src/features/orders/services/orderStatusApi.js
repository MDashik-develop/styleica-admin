import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls: Order Status ------------------ //

const getAllOrderStatus = async () => {
    const res = await axiosPrivate.get("/order-status");
    return res.data;
};

const getSingleOrderStatus = async (id) => {
    const res = await axiosPrivate.get(`/order-status/${id}/show`);
    return res.data;
};

const createOrderStatus = async (payload) => {
    const res = await axiosPrivate.post("/order-status/create", payload);
    return res.data;
};

const updateOrderStatus = async ({ id, payload }) => {
    const res = await axiosPrivate.put(`/order-status/${id}/update`, payload);
    return res.data;
};

const deleteOrderStatus = async (id) => {
    const res = await axiosPrivate.delete(`/order-status/${id}/delete`);
    return res.data;
};

// ------------------ React Query Hooks: Order Status ------------------ //

// Get all statuses
export const useGetAllOrderStatus = () => {
    return useQuery({
        queryKey: ["orderStatus"],
        queryFn: getAllOrderStatus,
    });
};

// Get single status
export const useGetSingleOrderStatus = (id) => {
    return useQuery({
        queryKey: ["orderStatus", id],
        queryFn: () => getSingleOrderStatus(id),
        enabled: !!id,
    });
};

// Create status
export const useCreateOrderStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createOrderStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(["orderStatus"]);
        },
    });
};

// Update status
export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateOrderStatus,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["orderStatus"]);
            queryClient.invalidateQueries(["orderStatus", variables.id]);
        },
    });
};

// Delete status
export const useDeleteOrderStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteOrderStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(["orderStatus"]);
        },
    });
};