const styles = {
  global: {
    html: {
      boxSizing: 'border-box',
      overflowX: 'hidden',
    },
    h1: {
      fontFamily: 'var(--font-montserrat)',
    },
    p: {
      fontFamily: 'var(--font-fira)',
    },
    '.slick-dots': {
      top: '-10px',
      left: '-10px',
      width: 'initial',
      height: '10px',
    },
    '.slick-dots li button:before': {
      color: 'white',
    },
    '.slick-dots li.slick-active button:before': {
      color: '#32ABFF',
    },
    '*': {
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(50,171,255,0.35) transparent',
    },
    '*::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
    },
    '*::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '*::-webkit-scrollbar-thumb': {
      background: 'linear-gradient(180deg, rgba(50,171,255,0.35) 0%, rgba(50,171,255,0.2) 100%)',
      borderRadius: '999px',
      border: '2px solid transparent',
      backgroundClip: 'padding-box',
      transition: 'background 200ms ease',
    },
    '*::-webkit-scrollbar-thumb:hover': {
      background: 'linear-gradient(180deg, rgba(50,171,255,0.7) 0%, rgba(50,171,255,0.45) 100%)',
      backgroundClip: 'padding-box',
    },
    '*::-webkit-scrollbar-thumb:active': {
      background: '#32ABFF',
      backgroundClip: 'padding-box',
    },
    '*::-webkit-scrollbar-corner': {
      background: 'transparent',
    },
  },
};

export default styles;
