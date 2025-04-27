import type { Configuration } from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack config for dev mode
  turbopack: {
    rules: {
      '*.{glsl,vs,fs,vert,frag}': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
  // Webpack config for build mode
  webpack: (config: Configuration) => {
    if (!config.module) config.module = { rules: [] };
    if (!config.module.rules) config.module.rules = [];
    
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
    });
    return config;
  },
};

module.exports = nextConfig;