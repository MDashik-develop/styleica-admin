import {
  MdDashboard,
  MdPeopleOutline,
  MdOutlineSettings,
  MdOutlineBrokenImage,
  MdOutlineWarehouse,
  MdOutlineSms,
  MdMoveToInbox,
  MdAdsClick,
  MdAccountBalanceWallet,
} from "react-icons/md";
import { FaExchangeAlt, FaChartBar } from "react-icons/fa";
import { RiDiscountPercentLine, RiTruckLine } from "react-icons/ri";
import { LuListStart, LuListTodo, LuMonitorCog } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";

export const sidebarItems = [
  { key: "dashboard", to: "/", icon: MdDashboard, label: "Dashboard" },
  // { key: "preorder", to: "/pre-orders", icon: LuListStart, label: "Pre-Orders" },
  { key: "orders", to: "/orders", icon: LuListTodo, label: "Orders" },
  { key: "products", to: "/products", icon: MdMoveToInbox, label: "Products" },
  // { key: "transactions", to: "/transactions", icon: FaExchangeAlt, label: "Transactions" },
  // { key: "accounts", to: "/accounts", icon: MdAccountBalanceWallet, label: "Accounts" },
  // { key: "reports", to: "/reports", icon: FaChartBar, label: "Reports" },
  { key: "courier", to: "/courier", icon: RiTruckLine, label: "Courier" },
  // { key: "discounts", to: "/discounts", icon: RiDiscountPercentLine, label: "Discounts" },
  // { key: "damages", to: "/damages", icon: MdOutlineBrokenImage, label: "Damages" },
  { key: "customers", to: "/customers", icon: PiUsersThree, label: "Customers" },
  // { key: "warehouses", to: "/warehouses", icon: MdOutlineWarehouse, label: "Warehouse" },
  // { key: "sms", to: "/sms", icon: MdOutlineSms, label: "SMS" },
  { key: "users", to: "/users", icon: MdPeopleOutline, label: "Users" },
  { key: "settings", to: "/settings", icon: MdOutlineSettings, label: "Settings" },
  { key: "website-settings", to: "/website-settings", icon: LuMonitorCog, label: "Website Settings" },
  { key: "user-activity", to: "/user-activity", icon: MdAdsClick, label: "User Activity" },
];
