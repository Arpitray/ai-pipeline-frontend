/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        // Supabase storage — processed product images
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        // Railway backend — in case it ever serves images directly
        protocol: 'https',
        hostname: 'ai-pipeline-production-daac.up.railway.app',
      },
    ],
  },
};

export default nextConfig;
