/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  typescript:{
    ignoreBuildErrors: true,
  },
  images:{
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
