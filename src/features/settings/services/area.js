// area.js (service file)
import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls ------------------ //

// Get all areas
const getAllArea = async (params) => {
    const res = await axiosPrivate.get("/website/distric", { params });
    return res.data;
};

// Create / Update area
const saveArea = async (payload) => {
    const res = await axiosPrivate.post("/distric/edit", payload);
    return res.data;
};

// Delete area
const deleteArea = async (id) => {
    const res = await axiosPrivate.delete(`/distric/delete/${id}`);
    return res.data;
};

// ------------------ React Query Hooks ------------------ //

// Get all areas
export const useGetAllArea = (params = {}) => {
    return useQuery({
        queryKey: ["area", params],
        queryFn: () => getAllArea(params),
    });
};

// Create area
export const useCreateArea = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: saveArea,
        onSuccess: () => {
            queryClient.invalidateQueries(["area"]);
        },
    });
};


// Update area
export const useUpdateArea = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: saveArea,
        onSuccess: () => {
            queryClient.invalidateQueries(["area"]);
        },
    });
};

// Delete area
export const useDeleteArea = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteArea,
        onSuccess: () => {
            queryClient.invalidateQueries(["area"]);
        },
    });
};