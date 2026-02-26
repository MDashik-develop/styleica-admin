import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls ------------------ //

// Get all attributes
const getAllAttributes = async () => {
    const res = await axiosPrivate.get("/attributes");
    return res.data;
};

// Create attribute
const createAttribute = async (payload) => {
    const res = await axiosPrivate.post("/attributes/create", payload);
    return res.data;
};

// Update attribute
const updateAttribute = async ({ id, payload }) => {
    const res = await axiosPrivate.put(`/attributes/${id}/update`, payload);
    return res.data;
};

// Delete attribute
const deleteAttribute = async (id) => {
    const res = await axiosPrivate.delete(`/attributes/${id}/delete`);
    return res.data;
};

// ------------------ React Query Hooks ------------------ //

// Get all attributes
export const useGetAllAttributes = () => {
    return useQuery({
        queryKey: ["attributes"],
        queryFn: getAllAttributes,
    });
};

// Create attribute
export const useCreateAttribute = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAttribute,
        onSuccess: () => queryClient.invalidateQueries(["attributes"]),
    });
};

// Update attribute
export const useUpdateAttribute = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateAttribute,
        onSuccess: () => queryClient.invalidateQueries(["attributes"]),
    });
};

// Delete attribute
export const useDeleteAttribute = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAttribute,
        onSuccess: () => {
            queryClient.invalidateQueries(["attributes"]);
        },
    });
};
