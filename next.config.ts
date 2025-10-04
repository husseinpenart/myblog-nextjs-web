import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    NEXT_PUBLIC_API_URL:"http://localhost:8080/api/v1"
  },
  
};

export default nextConfig;
