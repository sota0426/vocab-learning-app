/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/vocab-learning-app', // リポジトリ名に合わせる
  assetPrefix: '/vocab-learning-app/'
}

module.exports = nextConfig