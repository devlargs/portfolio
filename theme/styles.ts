import { Fira_Sans, Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
});

const firaSans = Fira_Sans({
  weight: ['400'],
  subsets: ['latin'],
});

const styles = {
  global: {
    h1: {
      fontFamily: montserrat.style.fontFamily,
    },
    p: {
      fontFamily: firaSans.style.fontFamily,
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
  },
};

export default styles;
