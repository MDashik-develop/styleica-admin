import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls ------------------ //

// Get all payment methods
const getAllPayments = async () => {
    const res = await axiosPrivate.get("/payment-methood");
    return res.data;
};

// Get single payment method by id
const getPaymentById = async (id) => {
    const res = await axiosPrivate.get(`/payment-methood/${id}/show`);
    return res.data;
};

// Update payment method
const updatePayment = async ({ id, payload }) => {
    const res = await axiosPrivate.put(`/payment-methood/${id}/update`, payload);
    return res.data;
};

// ------------------ React Query Hooks ------------------ //

// Get all payment methods
export const useGetAllPayments = () => {
    return useQuery({
        queryKey: ["payments"],
        queryFn: getAllPayments,
    });
};

// Get single payment method
export const useGetPaymentById = (id) => {
    return useQuery({
        queryKey: ["payments", id],
        queryFn: () => getPaymentById(id),
        enabled: !!id,
    });
};

// Update payment method
export const useUpdatePayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updatePayment,
        onSuccess: () => queryClient.invalidateQueries(["payments"]),
    });
};
