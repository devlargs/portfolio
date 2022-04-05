const Text = {
  variants: {
    navlink: {
      color: 'white',
      marginRight: '2rem',
    },
    gradient: {
      background: 'linear-gradient(90deg, #F07929 11.4%, #EE2A7B 72.93%), #EFF1F6',
      backgroundClip: 'text',
      lineHeight: '64px',
      fontSize: '48px',
      fontWeight: 600,
      marginBottom: '2rem',
    },
  },
};

const Button = {
  variants: {
    primary: {
      color: 'white',
      bg: 'primary',
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '21px',
    },
  },
  link: {
    color: '#0F4797',
    lineHeight: '21px',
    fontSize: '18px',
    fontWeight: 500,
  },
};

const COMPONENTS = {
  Button,
  Text,
};

export default COMPONENTS;
