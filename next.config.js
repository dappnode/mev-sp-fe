if (!process.env.BACKEND_URL) {
  throw new Error('BACKEND_URL environment variable is not defined');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL}/:path*`,
      },
    ];
  },

  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },

  async headers() {
    const headers = [];
    if (process.env.NEXT_PUBLIC_SELECTED_CHAIN === 'goerli') {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      });
    }
    return headers;
  },
};

module.exports = nextConfig;
