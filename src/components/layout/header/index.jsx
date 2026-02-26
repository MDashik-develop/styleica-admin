import { AutoComplete, Input, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { FaRegClock, FaGlobe } from "react-icons/fa";
import { HiBars3CenterLeft, HiHome } from "react-icons/hi2";
import { MdOutlineDateRange } from "react-icons/md";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sidebarItems } from "../../../utils/sidebarItems";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useLogout } from "../../../features/auth/services/auth";


const Header = ({ showSidebar, setShowSidebar }) => {

    const { user, loading } = useSelector((state) => state.user);
    const [dateTime, setDateTime] = useState(new Date());
    const navigate = useNavigate();
    const handleLogOut = useLogout();

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Format date and time separately
    const date = dateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const time = dateTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    });

    // AutoComplete options
    const options = sidebarItems.map((item) => ({
        value: item.label,
        route: item.to,
    }));

    // handle page select/change
    const handleSearchChange = (value) => {
        const selected = options.find((opt) => opt.value === value);
        if (selected) {
            navigate(selected.route);
        }
    };

    // dummy notifications data
    const content = (
        <div className="w-52 space-y-1 text-sm 2xl:text-base">
            <h2 className="font-bold pb-2">Notifications</h2>
            <p className="flex items-center gap-1"><VscDebugBreakpointLog className="mt-[2px]" /> New order placed.</p>
            <p className="flex items-center gap-1"><VscDebugBreakpointLog className="mt-[2px]" /> Order canceled.</p>
            <p className="flex items-center gap-1"><VscDebugBreakpointLog className="mt-[2px]" /> Order placed.</p>
        </div>
    );


    return (
        <div className="bg-light flex justify-between items-center px-4 py-3 border-b border-slate-200 shadow-sm relative">

            {/* overlay for mobile sidebar open */}
            {showSidebar && <div className="absolute top-0 left-0 w-full h-full bg-dark/20"></div>}

            {/* Route Search */}
            <div className="hidden lg:flex items-center gap-3">
                <Tooltip placement="bottom" title="Home">
                    <Link to={"/"}>
                        <HiHome className="text-2xl opacity-70" />
                    </Link>
                </Tooltip>
                <Tooltip placement="bottom" title="Visit Website">
                    <Link to={"https://genters.com.bd/"} target="_blank">
                        <FaGlobe className="text-xl opacity-70" />
                    </Link>
                </Tooltip>

                <div className="w-[300px]">
                    <AutoComplete
                        options={options}
                        onSelect={handleSearchChange}
                        onChange={handleSearchChange}
                        placeholder="Search Pages..."
                        filterOption={(inputValue, option) =>
                            option.value.toLowerCase().includes(inputValue.toLowerCase())
                        }
                    >
                        <Input />
                    </AutoComplete>
                </div>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
                <button onClick={() => setShowSidebar(true)} className="text-2xl">
                    <HiBars3CenterLeft />
                </button>
                <Link to={"/"}>
                    {/* <img src={siteConfig?.logo} className="max-w-24 object-contain" alt="logo" /> */}
                    <span className="text-lg font-semibold">Genters</span>
                </Link>
            </div>

            <div className="flex items-center gap-x-3 lg:gap-x-5 text-2xl">

                {/* date and time */}
                <div className="hidden lg:flex items-center gap-3 text-[14px] opacity-90 border border-slate-300 px-3 py-1">
                    <div className="flex items-center gap-1">
                        <MdOutlineDateRange className="text-lg" />
                        <p>{date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaRegClock className="text-base" />
                        <p>{time}</p>
                    </div>
                </div>

                {/* notifications */}
                {/* <button className="relative">
                    <Popover content={content} trigger="click" placement="bottomRight">
                        <GoBell />
                        <span className="absolute -top-[9px] -right-2 w-5 h-5 flex justify-center items-center blink-bg text-light text-[11px] rounded-full">5</span>
                    </Popover>
                </button> */}

                {/* profile btn */}
                <Tooltip placement="bottom" title="Profile">
                    <Link to={"/profile"}>{
                        loading ?
                            <img src="https://i.ibb.co.com/phNffNq/user.png" className="w-8 h-8 object-cover border border-primary rounded-full" alt="user" />
                            :
                            <img src={user?.media?.urls?.small} className="w-8 h-8 object-cover border border-primary rounded-full" alt="user" />
                    }
                    </Link>
                </Tooltip>

                {/* logout btn */}
                <Tooltip placement="bottom" title="Logout">
                    <button
                        onClick={handleLogOut} className="text-red-600 text-2xl" title="Logout">
                        <RiLogoutCircleLine />
                    </button>
                </Tooltip>

            </div>
        </div>
    );
};

export default Header;