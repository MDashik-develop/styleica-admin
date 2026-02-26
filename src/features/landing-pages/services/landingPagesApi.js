import { axiosPrivate } from "../../../config/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------ API Calls ------------------ //

// Admin APIs
const getAllLandingPages = async (params) => {
    const res = await axiosPrivate.get("/landing-pages", { params });
    return res.data;
};

const getLandingPageById = async (id) => {
    const res = await axiosPrivate.get(`/landing-pages/${id}`);
    return res.data;
};

const createLandingPage = async (payload) => {
    const res = await axiosPrivate.post("/landing-pages", payload);
    return res.data;
};

const updateLandingPage = async ({ id, payload }) => {
    const res = await axiosPrivate.put(`/landing-pages/${id}`, payload);
    return res.data;
};

const deleteLandingPage = async (id) => {
    const res = await axiosPrivate.delete(`/landing-pages/${id}`);
    return res.data;
};

const duplicateLandingPage = async (id) => {
    const res = await axiosPrivate.post(`/landing-pages/${id}/duplicate`);
    return res.data;
};

const updateLandingPageStatus = async ({ id, status }) => {
    const res = await axiosPrivate.patch(`/landing-pages/${id}/status`, { status });
    return res.data;
};

// Website Public API
const getLandingPageBySlug = async (slug) => {
    const res = await axiosPrivate.get(`/website/landing-page/${slug}`);
    return res.data;
};

// ------------------ React Query Hooks ------------------ //

// Get all landing pages (Admin)
export const useGetAllLandingPages = (params) => {
    return useQuery({
        queryKey: ["landing-pages", params],
        queryFn: () => getAllLandingPages(params),
    });
};

// Get single landing page by ID (Admin)
export const useGetLandingPageById = (id) => {
    return useQuery({
        queryKey: ["landing-pages", id],
        queryFn: () => getLandingPageById(id),
        enabled: !!id,
    });
};

// Create landing page
export const useCreateLandingPage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createLandingPage,
        onSuccess: () => queryClient.invalidateQueries(["landing-pages"]),
    });
};

// Update landing page
export const useUpdateLandingPage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateLandingPage,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["landing-pages"]);
            queryClient.invalidateQueries(["landing-pages", variables.id]);
        },
    });
};

// Delete landing page
export const useDeleteLandingPage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteLandingPage,
        onSuccess: () => queryClient.invalidateQueries(["landing-pages"]),
    });
};

// Duplicate landing page
export const useDuplicateLandingPage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: duplicateLandingPage,
        onSuccess: () => queryClient.invalidateQueries(["landing-pages"]),
    });
};

// Update Status (Active/Inactive)
export const useUpdateLandingPageStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateLandingPageStatus,
        onSuccess: () => queryClient.invalidateQueries(["landing-pages"]),
    });
};

// Get landing page by slug (Public Website)
export const useGetLandingPageBySlug = (slug) => {
    return useQuery({
        queryKey: ["public-landing-page", slug],
        queryFn: () => getLandingPageBySlug(slug),
        enabled: !!slug,
    });
};