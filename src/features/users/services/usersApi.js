import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls ------------------ //

// Get all users
const getAlleUser = async ({ page = 1, pagination = 10 }) => {
    const res = await axiosPrivate.get("/get-allUserList", {
        params: {
            page,
            pagination,
        },
    });
    return res.data;
};

// Create user
const createUser = async (data) => {
    const res = await axiosPrivate.post("/user/create", data);
    return res.data;
};

// Update user
const updateUser = async (payload) => {
    const res = await axiosPrivate.put(`/user/update`, payload);
    return res.data;
};
// Delete user
const deleteUser = async (id) => {
    const res = await axiosPrivate.delete(`/user/delete`, {
        params: { user_id: id },
    });
    return res.data;
};


// ------------------ React Query Hooks ------------------ //

// Get all user
export const useGetAllUsers = (page = 1, pagination = 10) => {
    return useQuery({
        queryKey: ["users", page, pagination],
        queryFn: () => getAlleUser({ page, pagination }),
    });
};

// Create user
export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUser,
        onSuccess: () => queryClient.invalidateQueries(["users"]),
    });
};

// Update user
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => queryClient.invalidateQueries(["users"]),
    });
};

// Delete user
export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        },
    });
};
