//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during the build process
  },
  env: {
    ADD_PURCHASE_URL: process.env.ADD_PURCHASE_URL,
    CLOUDRUN_DEV_URL: process.env.CLOUDRUN_DEV_URL,
    POSTNORD_URL: process.env.POSTNORD_URL,
    PN_API_KEY: process.env.PN_API_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    MAILJET_USERNAME: process.env.MAILJET_USERNAME,
    MAILJET_PASSWORD: process.env.MAILJET_PASSWORD,
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
