import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls ------------------ //

// Bulk courier action
const bulkCourierAction = async ({ courierSlug, payload }) => {
    const res = await axiosPrivate.post(
        `/couriers/bulk/${courierSlug}`,
        payload
    );
    return res.data;
};

// Order status change
const orderStatusChange = async (payload) => {
    const res = await axiosPrivate.post(
        "/orders/status-change",
        payload
    );
    return res.data;
};

// Order print status change
const orderPrintStatusChange = async (payload) => {
    const res = await axiosPrivate.post(
        "/orders/print-status-change",
        payload
    );
    return res.data;
};

// Order assigned
const orderAssignedToUser = async (payload) => {
    const res = await axiosPrivate.post(
        "/orders/assigned",
        payload
    );
    return res.data;
};


// ------------------ React Query Hooks ------------------ //

// Bulk courier mutation
export const useSendBulkCourier = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: bulkCourierAction,
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
            queryClient.invalidateQueries(["couriers"]);
        },
    });
};

// Order status change mutation
export const useOrderStatusChange = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: orderStatusChange,
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
        },
    });
};

// Order print status change mutation
export const useOrderPrintStatusChange = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: orderPrintStatusChange,
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
        },
    });
};

// Order assigned mutation
export const useOrderAssignedToUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: orderAssignedToUser,
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
            queryClient.invalidateQueries(["couriers"]);
        },
    });
};
