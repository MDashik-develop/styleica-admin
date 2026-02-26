import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls ------------------ //

// Fetch trashed products with pagination & search
const getProductTrash = async ({ page = 1, pagination = 10, search = "" }) => {
    const res = await axiosPrivate.get("/products/trash", {
        params: { page, pagination, search },
    });
    return res.data;
};

// Bulk restore products
const restoreProducts = async (ids) => {
    const res = await axiosPrivate.post("/products/restore", { ids });
    return res.data;
};

// Bulk permanent delete products
const forceDeleteProducts = async (ids) => {
    const res = await axiosPrivate.delete("/products/force-delete", { data: { ids } });
    return res.data;
};

// ------------------ React Query Hooks ------------------ //
export const useGetProductTrash = ({ page, pagination, search }) => {
    return useQuery({
        queryKey: ["products-trash", page, pagination, search],
        queryFn: () => getProductTrash({ page, pagination, search }),
        keepPreviousData: true, // smooth pagination
    });
};

export const useRestoreProducts = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: restoreProducts,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products-trash"] });
        },
    });
};

export const useForceDeleteProducts = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: forceDeleteProducts,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products-trash"] });
        },
    });
};