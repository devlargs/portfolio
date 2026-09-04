module.exports = {
  reactStrictMode: false,
  experimental: {
    /* Chakra and its icon package are barrel files re-exporting hundreds of
       modules. Without this every import of a single component pulls the whole
       barrel through the compiler on first request. */
    optimizePackageImports: ['@chakra-ui/react', '@chakra-ui/icons'],
  },
};
