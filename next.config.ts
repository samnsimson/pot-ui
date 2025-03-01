import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [{ source: "/data/:path*", destination: "http://localhost:8000/api/v1/:path*" }];
    },
};

export default nextConfig;
