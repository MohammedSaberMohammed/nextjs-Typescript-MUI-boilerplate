/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const configs = {
  reactStrictMode: true,
  swcMinify: true,
  i18n
};

module.exports = configs;
