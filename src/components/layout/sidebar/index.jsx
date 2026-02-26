import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import { Skeleton, Tooltip } from "antd";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useLogout } from "../../../features/auth/services/auth";
import Media from "../../reusable/media";
import { useAuthorize } from "../../../hooks/useAuthorize";
import { RiDeleteBinFill } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";


const Sidebar = ({ collapsed, setCollapsed, setShowSidebar }) => {

    const handleLogOut = useLogout();
    const location = useLocation();
    const currentPath = location.pathname + location.search;

    const { permittedSidebar, uniqueFeatures, isSuperAdmin, loading } = useAuthorize();
    const canViewMedia = isSuperAdmin || uniqueFeatures.includes("media");

    const isProductExist = permittedSidebar.some(item => item.key === "products");


    if (loading) {
        return (
            <div className="flex flex-col h-full ml-2 relative bg-light px-3 pt-3">
                {/* Nav Items Skeleton */}
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton.Avatar active size="small" shape="square" />
                            {!collapsed && <Skeleton.Input active size="small" style={{ width: i % 2 === 0 ? 120 : 80 }} />}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full ml-2 relative bg-light">

            <div className="sticky top-0 left-0 flex items-center gap-x-3 px-3 pt-3 pb-3 bg-light border-b border-slate-400">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-xl transition"
                >
                    <FiMenu />
                </button>
                <div className="flex-1 flex justify-between items-center">
                    <h1 className={`${collapsed && "opacity-0 duration-300"} font-semibold text-lg whitespace-nowrap`}>Genters</h1>
                    <button
                        onClick={() => setShowSidebar(false)}
                        className="text-xl transition md:hidden"
                    >
                        <FaXmark />
                    </button>
                </div>
            </div>

            {/* Nav Items */}
            <nav className="mt-3 flex-1">
                {permittedSidebar.map((item, idx) => {
                    const isActive = currentPath === item.to;
                    return (
                        <Tooltip key={idx} placement="right" title={item?.label || ""}>
                            <Link
                                to={item.to}
                                onClick={() => setShowSidebar(false)}
                                className={`flex items-center gap-3 px-[10px] py-2 mb-2 rounded-md transition-all duration-200
                hover:bg-dark hover:text-light ${isActive ? "bg-dark text-white font-medium" : ""
                                    }`}
                            >

                                <item.icon className="text-xl min-w-[24px]" />

                                <span className={`${collapsed && "opacity-0 duration-300"} whitespace-nowrap`}>
                                    {item.label}
                                </span>
                            </Link>
                        </Tooltip>
                    );
                })}

                {/* landing pages btn */}
                {
                    isSuperAdmin &&
                    <Tooltip placement="right" title="Landing Pages">
                        <Link
                            to="/landing-pages"
                            className={`flex items-center gap-3 px-[10px] py-2 rounded-md transition-all duration-200 hover:bg-dark hover:text-light w-full mb-2`}
                        >
                            <CgWebsite className="text-xl min-w-[24px]" />

                            <span className={`${collapsed && "opacity-0 duration-300"} whitespace-nowrap text-base`}>
                                Landing Pages
                            </span>
                        </Link>
                    </Tooltip>
                }

                {/* media btn */}
                {
                    canViewMedia &&
                    <div>
                        <Tooltip placement="right" title="Media">
                            <Media iconBtn={true} sidebarCollapsed={collapsed} />
                        </Tooltip>
                    </div>
                }

                {/* trash btn */}
                {
                    isProductExist &&
                    <Tooltip placement="right" title="Trash">
                        <Link
                            to="/trash?tab=product"
                            className={`flex items-center gap-3 px-[10px] py-2 rounded-md transition-all duration-200 hover:bg-dark hover:text-light text-red-600 w-full`}
                        >
                            <RiDeleteBinFill className="text-xl min-w-[24px]" />

                            <span className={`${collapsed && "opacity-0 duration-300"} whitespace-nowrap text-base`}>
                                Trash
                            </span>
                        </Link>
                    </Tooltip>
                }

                {/* logout btn */}
                {/* <Tooltip placement="right" title="Logout">
                    <button
                        onClick={handleLogOut}
                        className={`flex items-center gap-3 px-[10px] py-2 mt-2 rounded-md transition-all duration-200 hover:bg-dark hover:text-light text-red-600 w-full`}
                    >
                        <RiLogoutCircleLine className="text-xl min-w-[24px]" />

                        <span className={`${collapsed && "opacity-0 duration-300"} whitespace-nowrap text-base`}>
                            Logout
                        </span>
                    </button>
                </Tooltip> */}

            </nav>
        </div>
    );
};

export default Sidebar;
