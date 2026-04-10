const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  allowedDevOrigins: ['10.251.221.106'],
  ...(isGitHubPages && {
    output: 'export',
    basePath: '/nothing',
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

module.exports = nextConfig;
