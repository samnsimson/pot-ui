import { api } from "@/lib/api";
import { App } from "@/lib/types";
import { create } from "zustand";

interface AppsStore {
    appData: App | null;
    fetchAppData: (slug: string) => void;
}

const useAppsStore = create<AppsStore>((set) => ({
    appData: null,
    fetchAppData: async (slug) => {
        try {
            const data = await api.get_app_by_id_or_slug({ params: { key: slug } });
            set({ appData: data });
        } catch (error) {
            console.log("🚀 ~ fetchAppData: ~ error:", error);
        }
    },
}));
