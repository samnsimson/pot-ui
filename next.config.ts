import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "d3av08opq7lq5r.cloudfront.net",
                pathname: "**",
            },
        ],
    },
    env: {
        NEXT_AUTH_SKIP_BUILD_CHECK: "true",
    },
    async rewrites() {
        return [{ source: "/data/:path*", destination: "http://localhost:8000/api/v1/:path*" }];
    },
};

export default nextConfig;
