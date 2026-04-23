const layout = {
  left: {
    height: '100vh',
    padding: { base: '60px', lg: '80px' },
  },
  right: {
    height: { base: 'initial', lg: '100vh' },
    paddingY: '60px',
    paddingX: { base: '16px', lg: '100px' },
  },
} as const;

export default layout;
