//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/purchases',
        permanent: true,
      },
    ]
  },
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
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    IMVI_USERS_URL: process.env.IMVI_USERS_URL,
    DHL_API_KEY: process.env.DHL_API_KEY,
    IMVI_WOOCOMMERCE_URL: process.env.IMVI_WOOCOMMERCE_URL,
    NEXT_PUBLIC_VR_GLASSES_PRODUCT_ID: process.env.NEXT_PUBLIC_VR_GLASSES_PRODUCT_ID,
    NEXT_PUBLIC_LICENSE_PRODUCT_ID: process.env.NEXT_PUBLIC_LICENSE_PRODUCT_ID,
    WOO_API_KEY: process.env.WOO_API_KEY,
    WOO_API_SECERT: process.env.WOO_API_SECERT,
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }
    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
