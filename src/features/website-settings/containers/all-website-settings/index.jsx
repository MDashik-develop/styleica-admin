import { useState } from "react";
import { useGetAllCategory } from "../../../products/services/categoryApi.js";
import DynamicSettingsBody from "../../components/dynamicSettingsBody";
import { useGetAllWebsiteSetting } from "../../services/websiteSetting";
// import { Pagination } from "antd";


const AllWebsiteSettings = () => {
    const { data } = useGetAllWebsiteSetting();
    const [activeTab, setActiveTab] = useState("");
    const { data: categoryData} = useGetAllCategory({ page: 1, pagination: 1000 });
    const categories = categoryData?.data || [];

    // unique tabs
    const uniqueTabs = [...new Map((data || []).map(item => [item.group, item])).values()];
    const activeData = uniqueTabs.find(item => item.group === activeTab);
    const GroupData = data?.filter(item => item.group === activeTab);

    // defoult active tab = site group
    if (!activeTab) setActiveTab("site");
    return (
        <div>
            <h2 className="text-2xl font-semibold">Website Settings</h2>

            <div className="flex items-center flex-wrap gap-3 pt-3">
                {uniqueTabs.map(item => (
                    <button
                        key={item.group}
                        onClick={() => setActiveTab(item.group)}
                        className={`flex items-center gap-2 border px-3 py-1.5 text-sm transition capitalize
                        ${activeTab === item.group
                                ? "button"
                                : "button-outline"
                            }`}
                    >
                        {item.group}
                    </button>
                ))}
            </div>

            {/* TAB BODY */}
            <div className="card mt-6 p-4">
                {activeTab ? (
                    <DynamicSettingsBody item={activeData?.settings || activeData || []} GroupData={GroupData} Categories={categories} />
                ) : (
                    <p className="text-sm text-gray-500">Select a tab to view settings.</p>
                )}
            </div>
        </div>
    );
};

export default AllWebsiteSettings;
