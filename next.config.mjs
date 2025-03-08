/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'drive.google.com',
      'linkedin.com',
      'instagram.com',
      'google.com',
      'twitter.com',
      'res.cloudinary.com'
    ],
  },
};

export default nextConfig;
