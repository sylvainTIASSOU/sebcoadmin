/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
    },
    env:{
        API_URL:  'https://sebco-api-update.vercel.app/' ,
    },
}

module.exports = nextConfig
