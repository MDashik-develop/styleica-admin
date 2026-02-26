import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchSiteConfig = createAsyncThunk(
    "siteConfig/fetchSiteConfig",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE_URL}/website/layout`);

            const data = res.data.data;

            return {
                companyName: data.app_name,
                logo: data.logo?.urls?.original,
                footerLogo: data.footerlogo?.urls?.original,

                phone: data.contact?.phone,
                address: data.contact?.address,
                socials: data.contact?.socials,

                seo: {
                    title: data.seo?.title,
                    description: data.seo?.description,
                },

                navItems: data.navitems || [],

                integrations: data.integrations,

                topbar: {
                    enabled: data.topbar?.enabled === "1",
                    text: data.topbar?.text,
                },
            };
        } catch (error) {
            return rejectWithValue("Failed to load site config");
        }
    }
);

const siteConfigSlice = createSlice({
    name: "siteConfig",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSiteConfig.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSiteConfig.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchSiteConfig.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default siteConfigSlice.reducer;