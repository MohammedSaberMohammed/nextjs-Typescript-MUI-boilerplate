/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const configs = {
  reactStrictMode: false,
  swcMinify: true,
  i18n,
  images: {
    domains: ['biker.jadeer.co', '3.68.234.34'],
  }
};

module.exports = configs;
