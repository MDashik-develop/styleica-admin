import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../layout/Root";
import Error from "../features/public/error";
import PrivateRoute from "./PrivateRoute";
import Login from "../features/auth/containers/login/index";
import ForgotPassword from "../features/auth/containers/forgot-password/index";
import SignUp from "../features/auth/containers/signup/index";
import Dashboard from "../features/dashboard/containers/dashbaord/index";
import AllOrders from "../features/orders/containers/all-orders/index";
import OrderDetails from "../features/orders/containers/order-detail/index";
import AllProducts from "../features/products/containers/all-products/index";
import ManageProduct from "../features/products/containers/manage-product/index";
import ProductDetails from "../features/products/containers/product-details/index";
import AllCategories from "../features/products/containers/categories/all-categories/index";
import AllAttributes from "../features/products/containers/attributes/all-attribute/index";
import AllBrands from "../features/products/containers/brands/all-brand/index";
import AllPreOrders from "../features/pre-order/containers/all-pre-orders/index";
import PreOrderManage from "../features/pre-order/containers/pre-order-manage/index";
import PreOrderDetails from "../features/pre-order/containers/pre-order-details/index";
import ReportList from "../features/reports/containers/report-list/index";
import AllCustomers from "../features/customers/containers/all-customers/index";
import CustomerDetails from "../features/customers/containers/customer-details/index";
import AllTransactions from "../features/transactions/container/all-transactions/index";
import TransactionDetails from "../features/transactions/container/transaction-details/index";
import AllAccounts from "../features/accounts/containers/all-accounts/index";
import AllCourier from "../features/courier/containers/all-courier/index";
import AllSettings from "../features/settings/containers/all-settings/index";
import AllDiscounts from "../features/discounts/containers/all-discounts/index";
import AllDamages from "../features/damages/containers/all-damages/index";
import DamageDetails from "../features/damages/containers/damage-details/index";
import AllWarehouses from "../features/warehouses/containers/all-warehouses/index";
import WarehouseDetails from "../features/warehouses/containers/warehouse-details/index";
import AllUserActivity from "../features/user-activity/containers/all-user-activity/index";
import Sms from "../features/sms/containers/sms/index";
import AllUsers from "../features/users/containers/all-users/index";
import UserDetails from "../features/users/containers/user-details/index";
import AllWebsiteSettings from "../features/website-settings/containers/all-website-settings/index";
import Profile from "../features/profile/containers/profile/index";
import PublicRoute from "./PublicRoute";
import AllOrderStatus from "../features/orders/containers/all-order-status";
import ManageOrder from "../features/orders/containers/manage-order";
import AllTrash from "../features/trash/containers/all-trash";
import AllLandingPages from "../features/landing-pages/containers/all-landing-pages";
import ManageLandingPages from "../features/landing-pages/containers/manage-landing-pages";


// public routes
const publicRoutes = [
    { path: "/login", element: <PublicRoute><Login /></PublicRoute> },
    { path: "/signup", element: <PublicRoute><SignUp /></PublicRoute> },
    { path: "/forgot-password", element: <PublicRoute><ForgotPassword /></PublicRoute> },
];

// private routes
const privateRoutes = [
    {
        path: "/",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
    },
    {
        path: "/profile",
        element: (
            <PrivateRoute>
                <Profile />
            </PrivateRoute>
        ),
    },
    {
        path: "/pre-orders",
        element: (
            <PrivateRoute>
                <AllPreOrders />
            </PrivateRoute>
        ),
    },
    {
        path: "/pre-orders/:id",
        element: (
            <PrivateRoute>
                <PreOrderDetails />
            </PrivateRoute>
        ),
    },
    {
        path: "/pre-orders/manage/:id?",
        element: (
            <PrivateRoute>
                <PreOrderManage />
            </PrivateRoute>
        ),
    },
    {
        path: "/orders",
        element: (
            <PrivateRoute>
                <AllOrders />
            </PrivateRoute>
        ),
    },
    {
        path: "/orders/:id",
        element: (
            <PrivateRoute>
                <OrderDetails />
            </PrivateRoute>
        ),
    },
    {
        path: "/orders/manage/:id?",
        element: (
            <PrivateRoute>
                <ManageOrder />
            </PrivateRoute>
        ),
    },
    {
        path: "/orders/status",
        element: (
            <PrivateRoute>
                <AllOrderStatus />
            </PrivateRoute>
        ),
    },
    {
        path: "/products",
        element: (
            <PrivateRoute>
                <AllProducts />
            </PrivateRoute>
        ),
    },
    {
        path: "/products/manage/:id?",
        element: (
            <PrivateRoute>
                <ManageProduct />
            </PrivateRoute>
        ),
    },
    {
        path: "/products/:slug",
        element: (
            <PrivateRoute>
                <ProductDetails />
            </PrivateRoute>
        ),
    },
    {
        path: "/products/categories",
        element: (
            <PrivateRoute>
                <AllCategories />
            </PrivateRoute>
        ),
    },
    {
        path: "/products/attributes",
        element: (
            <PrivateRoute>
                <AllAttributes />
            </PrivateRoute>
        ),
    },
    {
        path: "/products/brands",
        element: (
            <PrivateRoute>
                <AllBrands />
            </PrivateRoute>
        ),
    },
    {
        path: "/discounts",
        element: (
            <PrivateRoute>
                <AllDiscounts />
            </PrivateRoute>
        ),
    },
    {
        path: "/damages",
        element: (
            <PrivateRoute>
                <AllDamages />
            </PrivateRoute>
        ),
    },
    {
        path: "/damages/:id",
        element: (
            <PrivateRoute>
                <DamageDetails />
            </PrivateRoute>
        ),
    },
    {
        path: "/reports",
        element: (
            <PrivateRoute>
                <ReportList />
            </PrivateRoute>
        ),
    },
    {
        path: "/customers",
        element: (
            <PrivateRoute>
                <AllCustomers />
            </PrivateRoute>
        ),
    },
    {
        path: "/customers/:id",
        element: (
            <PrivateRoute>
                <CustomerDetails />
            </PrivateRoute>
        ),
    },
    {
        path: "/transactions",
        element: (
            <PrivateRoute>
                <AllTransactions />
            </PrivateRoute>
        ),
    },
    {
        path: "/transactions/:id",
        element: (
            <PrivateRoute>
                <TransactionDetails />
            </PrivateRoute>
        ),
    },
    {
        path: "/accounts",
        element: (
            <PrivateRoute>
                <AllAccounts />
            </PrivateRoute>
        ),
    },
    {
        path: "/courier",
        element: (
            <PrivateRoute>
                <AllCourier />
            </PrivateRoute>
        ),
    },
    {
        path: "/sms",
        element: (
            <PrivateRoute>
                <Sms />
            </PrivateRoute>
        ),
    },
    {
        path: "/warehouses",
        element: (
            <PrivateRoute>
                <AllWarehouses />
            </PrivateRoute>
        ),
    },
    {
        path: "/warehouses/:id",
        element: (
            <PrivateRoute>
                <WarehouseDetails />
            </PrivateRoute>
        ),
    },
    {
        path: "/users",
        element: (
            <PrivateRoute>
                <AllUsers />
            </PrivateRoute>
        ),
    },
    {
        path: "/users/:id",
        element: (
            <PrivateRoute>
                <UserDetails />
            </PrivateRoute>
        ),
    },
    {
        path: "/settings",
        element: (
            <PrivateRoute>
                <AllSettings />
            </PrivateRoute>
        ),
    },
    {
        path: "/website-settings",
        element: (
            <PrivateRoute>
                <AllWebsiteSettings />
            </PrivateRoute>
        ),
    },
    {
        path: "/landing-pages",
        element: (
            <PrivateRoute>
                <AllLandingPages />
            </PrivateRoute>
        ),
    },
    {
        path: "/landing-pages/manage/:id?",
        element: (
            <PrivateRoute>
                <ManageLandingPages />
            </PrivateRoute>
        ),
    },
    {
        path: "/user-activity",
        element: (
            <PrivateRoute>
                <AllUserActivity />
            </PrivateRoute>
        ),
    },
    {
        path: "/trash",
        element: (
            <PrivateRoute>
                <AllTrash />
            </PrivateRoute>
        ),
    },
];

// routes
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            ...publicRoutes,
            ...privateRoutes,
        ],
    },
]);

export default router;