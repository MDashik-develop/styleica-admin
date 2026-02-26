import { axiosPrivate } from "../../../../config/axiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const MEDIA_KEYS = {
    all: ["media"],
    lists: (page) => [...MEDIA_KEYS.all, "list", page],
};


// ------------- API Functions ----------- //

// Get all media
const getAllMedia = async (page = 1) => {
    const res = await axiosPrivate.get("/media", { params: { page, paginate: 18 } });
    return res.data;
};

// Upload media
export const uploadMedia = async (files) => {

    const formData = new FormData();

    // Append all selected files
    files.forEach((file) => {
        formData.append("files[]", file.originFileObj);
    });

    // const values = formData.getAll('files[]');
    // console.log(values);

    const res = await axiosPrivate.post("/media/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
};


// ------------- React Query Hooks ----------- //

// Fetch all media
export const useMedia = (page = 1) => {
    return useQuery({
        queryKey: MEDIA_KEYS.lists(page),
        queryFn: () => getAllMedia(page),
        staleTime: 5 * 60 * 1000,
        placeholderData: (previousData) => previousData,
    });
};

// Upload media mutation
export const useUploadMedia = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: uploadMedia,
        onSuccess: () => {
            queryClient.invalidateQueries(MEDIA_KEYS.all);
        },
    });
};

