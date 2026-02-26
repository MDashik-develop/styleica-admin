import { axiosPrivate } from "../../../config/axiosConfig";
import { useQuery } from "@tanstack/react-query";

// Get all dashboard data
const getAllDashboards = async (params = {}) => {
    const res = await axiosPrivate.get("/dashboards", { params });
    return res.data;
};

// Get all dashboard data
export const useGetAllDashboards = (params = {}) => {
    return useQuery({
        queryKey: ["dashboards", params],
        queryFn: () => getAllDashboards(params),
    });
};