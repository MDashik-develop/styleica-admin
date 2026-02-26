import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/sidebar";
import Header from "../components/layout/header";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchSiteConfig } from "../redux/features/siteConfigSlice";
import { useEffect } from "react";

const Root = () => {

    const [showSidebar, setShowSidebar] = useState(false); // for mobile toggle
    const [collapsed, setCollapsed] = useState(true); // for icon-only mode
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { data: siteConfig, loading } = useSelector(
        (state) => state.siteConfig
    );

    useEffect(() => {
        dispatch(fetchSiteConfig());
    }, [dispatch]);


    const publicPaths = ["/login", "/signup", "/forgot-password"];
    const isLoginPath = publicPaths.includes(pathname);



    // console.log(siteConfig, "siteconfig");


    return (
        <main className="text-sm 2xl:text-lg">

            {/* overlay when sidebar open at mobile  */}
            {
                showSidebar && <div className="w-screen h-screen fixed bg-dark/20 z-0"></div>
            }

            {/* Sidebar */}
            {!isLoginPath && (
                <div
                    className={`sidebar bg-light text-dark h-screen fixed z-50 top-0 duration-300 overflow-y-auto pr-2
          ${showSidebar ? "left-0" : "-left-[500px] lg:left-0"}
          ${collapsed ? "w-[60px]" : "w-[250px] 2xl:w-[300px]"}
        `}
                >
                    <Sidebar
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        setShowSidebar={setShowSidebar}
                    />
                </div>
            )}

            {/* Header */}
            {!isLoginPath && (
                <div
                    className={`fixed z-10 top-0 left-0 w-full h-fit bg-light transition-all duration-300
            ${collapsed
                            ? "lg:pl-[60px] 2xl:pl-[60px]"
                            : "lg:pl-[250px] 2xl:pl-[300px]"
                        }`}
                >
                    <Header
                        showSidebar={showSidebar}
                        setShowSidebar={setShowSidebar}
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                    />
                </div>
            )}

            {/* Main Content */}
            <div
                className={`${isLoginPath
                    ? ""
                    : `w-full px-3 lg:pr-8 lg:pb-10 pt-[70px] transition-all duration-300 ${collapsed
                        ? "lg:pl-[80px] 2xl:pl-[80px]"
                        : "lg:pl-[270px] 2xl:pl-[320px]"
                    }`
                    }`}
            >
                <Outlet />
            </div>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </main>
    );
};

export default Root;
