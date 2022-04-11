import CompanyContribution from '@sections/CompanyContribution';
import Hero from '@sections/Hero';
import Specialization from '@sections/Specialization';
import { FC } from 'react';

const Home: FC = () => (
  <>
    <Hero />
    <CompanyContribution />
    <Specialization />
  </>
);

export default Home;
