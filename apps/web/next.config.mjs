/** @type {import('next').NextConfig} */
const nextConfig = {
  // @portfolio/contracts se publica como TypeScript crudo (main: src/index.ts),
  // asi que Next tiene que transpilarlo el mismo.
  transpilePackages: ["@portfolio/contracts"],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
