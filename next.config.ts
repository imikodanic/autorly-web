import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.licdn.com",
                pathname: "/dms/image/**", // Covers all LinkedIn image paths
            },
        ],
    },
};

export default nextConfig;
