import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls ------------------ //

// Get all customers with filters
const getAllCustomers = async ({ page = 1, pagination = 10, mobile = "", queryParams = {} }) => {
    const params = { page, pagination, mobile, ...queryParams, };
    const res = await axiosPrivate.get("/customers", { params });
    return res.data;
};


// Get single customer
const getSingleCustomer = async (id) => {
    const res = await axiosPrivate.get(`/customers/${id}`);
    return res.data;
};

// Get single customer
const getSingleCustomerWithoutCache = async (id) => {
    const res = await axiosPrivate.get(`/customers/${id}/show`);
    return res.data;
};

// Create customer
const createCustomer = async (payload) => {
    const res = await axiosPrivate.post("/customers", payload);
    return res.data;
};

// Update customer
const updateCustomer = async ({ id, payload }) => {
    const res = await axiosPrivate.put(`/customers/${id}`, payload);
    return res.data;
};

// Delete customer
const deleteCustomer = async (id) => {
    const res = await axiosPrivate.delete(`/customers/${id}`);
    return res.data;
};

// Mark customer as fraud
const markCustomerAsFraud = async ({ id, payload }) => {
    const res = await axiosPrivate.post(`/customers/mark-fraud/${id}`, payload);
    return res.data;
};

// search customer by number
const searchCustomerByNumber = async (number) => {
    const res = await axiosPrivate.get(`/customers/search/${number}`);
    return res.data;
};

// Get all district
const getAllDistrict = async () => {
    const res = await axiosPrivate.get("/website/distric");
    return res.data;
};


// ------------------ React Query Hooks ------------------ //

// Get all customers
export const useGetAllCustomers = (page = 1, pagination = 10, mobile = "", queryParams = {}) => {
    return useQuery({
        queryKey: ["customers", page, pagination, mobile, JSON.stringify(queryParams)],
        queryFn: () => getAllCustomers({ page, pagination, mobile, queryParams }),
        keepPreviousData: true,
    });
};

// Get single customer hook
export const useGetSingleCustomer = (id) => {
    return useQuery({
        queryKey: ["customer", id],
        queryFn: () => getSingleCustomer(id),
        enabled: !!id,
    });
};

// Get single customer hook
export const useGetSingleCustomerWithoutCache = (id) => {
    return useQuery({
        queryKey: ["customer-without-cache", id],
        queryFn: () => getSingleCustomerWithoutCache(id),
        enabled: !!id,
    });
};

// Create customer
export const useCreateCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCustomer,
        onSuccess: () => queryClient.invalidateQueries(["customers"]),
    });
};

// Update customer
export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCustomer,
        onSuccess: () => queryClient.invalidateQueries(["customers"]),
    });
};

// Delete customer
export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries(["customers"]);
        },
    });
};

// Mark as fraud hook
export const useMarkCustomerAsFraud = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markCustomerAsFraud,
        onSuccess: () => {
            queryClient.invalidateQueries(["customers"]);
        },
    });
};

// Search customer by number
export const useSearchCustomerByNumber = (number) => {
    return useQuery({
        queryKey: ["customer-search", number],
        queryFn: () => searchCustomerByNumber(number),
        enabled: !!number,
    });
};

// Get all district
export const useGetAllDistrict = () => {
    return useQuery({
        queryKey: ["districts"],
        queryFn: getAllDistrict,
    });
};


