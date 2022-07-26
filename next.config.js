/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images:{
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
