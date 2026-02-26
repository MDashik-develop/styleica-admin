// store/slices/orderFiltersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "",
    internal_note: "",
    same_numbers_orders: false,

    assigned_by: null,
    created_by: null,
    print_status: null,
    sort_asc: false,
    start_date: null,
    end_date: null,
    scource: null,
};

const orderFiltersSlice = createSlice({
    name: "orderFilters",
    initialState,
    reducers: {
        setStatusFilters: (state, action) => {
            state.status = action.payload.status;
            state.internal_note = action.payload.internal_note;
            state.same_numbers_orders = action.payload.same_numbers_orders;
        },

        setModalFilters: (state, action) => {
            return { ...state, ...action.payload };
        },

        clearOrderFilters: () => initialState,
    },
});

export const {
    setStatusFilters,
    setModalFilters,
    clearOrderFilters,
} = orderFiltersSlice.actions;

export default orderFiltersSlice.reducer;
