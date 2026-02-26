import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls ------------------ //

// Get all orders
const getAllOrders = async (params = {}) => {
    const res = await axiosPrivate.get("/orders", { params });
    return res.data;
};

// Get single order
const getSingleOrder = async (id) => {
    const res = await axiosPrivate.get(`/orders/${id}/show`);
    return res.data;
};

// Create order
const createOrder = async (payload) => {
    const res = await axiosPrivate.post("/orders/create", payload);
    return res.data;
};

// Update order
const updateOrder = async ({ id, payload }) => {
    const res = await axiosPrivate.put(`/orders/${id}/update`, payload);
    return res.data;
};

// Delete order
const deleteOrder = async (id) => {
    const res = await axiosPrivate.delete(`/orders/${id}/delete`);
    return res.data;
};

// Pay order
const payOrder = async (orderId) => {
    const res = await axiosPrivate.get(`/order/${orderId}/pay`);
    return res.data;
};

// View invoice
const viewInvoice = async (invoice) => {
    const res = await axiosPrivate.get(`/invoice/${invoice}`);
    return res.data;
};

// ------------------ React Query Hooks ------------------ //

// Get all orders
export const useGetAllOrders = (params = {}) => {
    return useQuery({
        queryKey: ["orders", params],
        queryFn: () => getAllOrders(params),
        keepPreviousData: true,
    });
};


// Get single order
export const useGetSingleOrder = (id) => {
    return useQuery({
        queryKey: ["order", id],
        queryFn: () => getSingleOrder(id),
        enabled: !!id,
    });
};

// Create order
export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createOrder,
        onSuccess: () => queryClient.invalidateQueries(["orders"]),
    });
};

// Update order
export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateOrder,
        onSuccess: () => queryClient.invalidateQueries(["orders"]),
    });
};

// Delete order
export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => queryClient.invalidateQueries(["orders"]),
    });
};

// Pay order
export const usePayOrder = () => {
    return useMutation({
        mutationFn: payOrder,
    });
};

// View invoice
export const useViewInvoice = (invoice) => {
    return useQuery({
        queryKey: ["invoice", invoice],
        queryFn: () => viewInvoice(invoice),
        enabled: !!invoice,
    });
};
