"use client";
import { createApiClient } from "@/lib/api";
import { axiosInstance } from "@/lib/axios-instance";

export const http = createApiClient("/data", { axiosInstance });
