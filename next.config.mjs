/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  images: {
    domains: ["res.cloudinary.com", "i.imghippo.com", "via.placeholder.com"],
  },
};

export default nextConfig;
