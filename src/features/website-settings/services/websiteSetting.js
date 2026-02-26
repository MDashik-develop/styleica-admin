import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls ------------------ //

// Get all website setting data
const getAlleWebsiteSetting = async () => {
    const res = await axiosPrivate.get("/website-settings");
    return res.data;
};

// Update website setting data
const updateWebsiteSetting = async (payload) => {
    const res = await axiosPrivate.post(`/website-settings/update`, payload);
    return res.data;
};


// ------------------ React Query Hooks ------------------ //

// Get all website setting data
export const useGetAllWebsiteSetting = () => {
    return useQuery({
        queryKey: ["website-settings"],
        queryFn: getAlleWebsiteSetting,
    });
};

// Update website setting data
export const useUpdateWebsiteSetting = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateWebsiteSetting,
        onSuccess: () => queryClient.invalidateQueries(["website-settings"]),
    });
};
