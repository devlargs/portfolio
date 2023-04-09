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
  },
};

export default styles;
