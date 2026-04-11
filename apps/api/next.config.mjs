/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@skillyards/db"],
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
};

export default nextConfig;