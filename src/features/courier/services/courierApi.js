import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls ------------------ //

// Get all couriers
const getAllCouriers = async (page = 1) => {
    const res = await axiosPrivate.get(`/couriers?page=${page}`);
    return res.data;
};

// Get single courier
const getSingleCourier = async (id) => {
    const res = await axiosPrivate.get(`/couriers/${id}`);
    return res.data;
};

// Update courier
const updateCourier = async ({ id, payload }) => {
    const res = await axiosPrivate.put(`/couriers/${id}`, payload);
    return res.data;
};

// ------------------ React Query Hooks ------------------ //

// Get all couriers
export const useGetAllCouriers = (page = 1) => {
    return useQuery({
        queryKey: ["couriers", page],
        queryFn: () => getAllCouriers(page),
    });
};

// Get single courier
export const useGetSingleCourier = (id) => {
    return useQuery({
        queryKey: ["courier", id],
        queryFn: () => getSingleCourier(id),
        enabled: !!id,
    });
};

// Update courier
export const useUpdateCourier = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCourier,
        onSuccess: () => {
            queryClient.invalidateQueries(["couriers"]);
        },
    });
};
