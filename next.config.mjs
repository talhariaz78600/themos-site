/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com", // Wrap domain in an object
            },
            {
                protocol: "https",
                hostname: "images.pexels.com", // Wrap domain in an object
            },
            
            {
                protocol: "https",
                hostname: "res.cloudinary.com", // Wrap domain in an object
            },
        ],
    },
};

export default nextConfig;

