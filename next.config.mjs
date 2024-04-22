/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // mongodb_username: "USERNAME",
    // mongodb_password: "PASSWORD",
    // mongodb_db: "DB",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "A1OgA6tJEyPl4NNHndKpSAmTJT37i/vn94+IO5++/Nw=",
  },
};

export default nextConfig;
