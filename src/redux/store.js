import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import orderFiltersReducer from "./features/ordersSlice";
import siteConfigReducer from "./features/siteConfigSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    orderFilters: orderFiltersReducer,
    siteConfig: siteConfigReducer,
  },
})