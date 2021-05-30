module.exports = {
  future: {
    webpack5: true,
  },
  webpack: function (config, options) {
    config.experiments = { topLevelAwait: true };
    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
