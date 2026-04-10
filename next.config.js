const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  ...(isGitHubPages && {
    output: 'export',
    basePath: '/nothing',
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

module.exports = nextConfig;
