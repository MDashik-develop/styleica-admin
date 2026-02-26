import { LoadingOutlined } from '@ant-design/icons';
import { DatePicker, Spin } from "antd";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import LowStock from "../../components/low-stock";
import PerformanceChart from "../../components/preformance-chart";
import Stats from "../../components/stats";
import TopCategories from "../../components/top-categories";
import TopProducts from "../../components/top-products";
import { useGetAllDashboards } from "../../services/dashboardApi";

const Dashboard = () => {
    // State for form data
    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
    });

    // State for filter params
    const [filterParams, setFilterParams] = useState({});

    // Use the hook with filterParams
    const { data: dashboards, isLoading, error } = useGetAllDashboards(filterParams);

    const handleSubmit = (e) => {
        e.preventDefault();


        const params = {};

        if (formData.start_date && formData.start_date.trim() !== "") {
            params.start_date = formData.start_date;
        }

        if (formData.end_date && formData.end_date.trim() !== "") {
            params.end_date = formData.end_date;
        }


        setFilterParams(params);

    };

    const handleClearFilter = () => {
        setFormData({
            start_date: "",
            end_date: "",
        });
        setFilterParams({});
    };

    // Check if any filter is applied
    const isFilterApplied = formData.start_date.trim() !== "" || formData.end_date.trim() !== "";
    const inputStyle = { width: '100%' };

    return (
        <div className="space-y-6">
            {/* Header and Filter Form */}
            <div className="grid items-center grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
                <h2 className="text-md md:text-lg hidden sm:block font-semibold  sm:col-span-2 md:col-span-1 lg:col-span-2">
                    Dashboard
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="sm:flex sm:justify-end sm:items-center sm:gap-4 col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2"
                >
                    <div className="flex flex-col sm:flex-row items-end gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">

                            <DatePicker style={inputStyle}
                                placeholder="Select Start Date"
                                onChange={(date, dateString) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        start_date: dateString
                                    }));
                                }}
                                disabled={false} />

                            <DatePicker style={inputStyle}
                                placeholder="Select End Date"
                                onChange={(date, dateString) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        end_date: dateString
                                    }));
                                }}
                                disabled={false} />
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto">
                            <button
                                type="submit"
                                className="button flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Spin indicator={<LoadingOutlined spin />} size="small" className="!text-light" />
                                ) : (
                                    <FaSave />
                                )}
                                {isLoading ? "Loading..." : "Filter"}
                            </button>

                            {isFilterApplied && (
                                <button
                                    type="button"
                                    onClick={handleClearFilter}
                                    className="button bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {/* Error Display */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">
                        Error loading dashboard data: {error.message}
                    </p>
                </div>
            )}

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin size="large" />
                </div>
            ) : (
                // Data Display
                <>
                    <Stats dashboards={dashboards} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* <SalesByDivision /> */}
                        <TopCategories categories={dashboards?.topCategories} />
                        <div className="lg:col-span-2">
                            <PerformanceChart data={dashboards?.chart_revenue} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* <RecentOrders /> */}
                        <TopProducts formattedData={dashboards?.topProducts} />
                        {/* <RevenueOverview />
                        <CustomerInsights /> */}
                        {/* <TopCategories /> */}
                        <LowStock lowStockItems={dashboards?.lowStockItems} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;