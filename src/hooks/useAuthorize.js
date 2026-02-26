import { useSelector } from "react-redux";
import { sidebarItems } from "../utils/sidebarItems";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";


export const useAuthorize = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const { user, loading } = useSelector((state) => state.user);

    const userFeatures = user?.roles?.flatMap(role =>
        role.permissions.map(p => p.name.split('.')[0])
    ) || [];

    const uniqueFeatures = [...new Set(userFeatures)];
    const isSuperAdmin = uniqueFeatures.includes("*");

    const permittedSidebar = sidebarItems.filter(item => {
        if (!user) return false; // Hide all if no user
        if (isSuperAdmin) return true;
        if (item.key === "dashboard") return true;
        return uniqueFeatures.includes(item.key) || uniqueFeatures.includes(item.key + 's');
    });

    const hasPermission = (key) => {
        if (!user) return false;
        if (isSuperAdmin || key === "dashboard") return true;
        return uniqueFeatures.includes(key) || uniqueFeatures.includes(key + 's');
    };

    // The Guard Effect - for routes
    useEffect(() => {
        if (loading || !user) return;

        const currentFeature = pathname.split('/')[1];
        const isKnownRoute = sidebarItems.some(item => item.to.includes(currentFeature));

        if (currentFeature && currentFeature !== "" && isKnownRoute) {
            if (!hasPermission(currentFeature)) {
                toast.error("Access Denied: You do not have permission.");
                navigate("/", { replace: true });
            }
        }
    }, [pathname, user, loading, isSuperAdmin, navigate]);

    // console.log(user);


    // but it's cleaner to just return the calculated data.
    return {
        permittedSidebar: user ? permittedSidebar : [],
        hasPermission,
        isSuperAdmin,
        uniqueFeatures,
        loading
    };
};