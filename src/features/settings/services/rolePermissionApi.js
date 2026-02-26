import { axiosPrivate } from "../../../config/axiosConfig";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


// ------------- API Functions ----------- //

// Get all permissions
const getAllPermission = async () => {
    const res = await axiosPrivate.get("/permission/all");
    return res.data;
};

// get roles
const getAllRoles = async () => {
    const res = await axiosPrivate.get("/role/all");
    return res.data;
};

// Create role
const createRole = async (payload) => {
    const res = await axiosPrivate.post("/role/create", payload);
    return res.data;
};

// Update role
const updateRole = async (payload) => {
    const res = await axiosPrivate.put("/role/update", payload);
    return res.data;
};

// Delete role
const deleteRole = async (id) => {
    const res = await axiosPrivate.delete(`/role/delete?id=${id}`);
    return res.data;
};


// ------------- React Query Hooks ----------- //

// Fetch all permissions
export const usePermissions = () => {
    return useQuery({
        queryKey: "permissions",
        queryFn: getAllPermission,
        staleTime: 5 * 60 * 1000,
    });
};

// get all roles
export const useAllRoles = () => {
    return useQuery({
        queryKey: "allRoles",
        queryFn: getAllRoles,
        staleTime: 5 * 60 * 1000,
    });
};

// create role
export const useCreateRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createRole,
        onSuccess: () => {
            queryClient.invalidateQueries(["allRoles"]);
        },
    });
};

// Update role
export const useUpdateRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateRole,
        onSuccess: () => {
            queryClient.invalidateQueries(["allRoles"]);
        },
    });
};

// Delete role
export const useDeleteRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRole,
        onSuccess: () => {
            queryClient.invalidateQueries(["allRoles"]);
        },
    });
};


