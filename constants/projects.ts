type Projects = {
  name: string;
  link: string;
  type: 'contribution' | 'clones' | 'personal';
};

const PROJECTS: Projects[] = [
  {
    name: 'Maximum Performance',
    link: 'https://maximum-performance.luxury/en',
    type: 'contribution',
  },
  {
    name: 'Betvision',
    link: 'https://betvision.com',
    type: 'contribution',
  },
  {
    name: 'HOV Website',
    link: 'https://hov.co',
    type: 'contribution',
  },
  {
    name: 'FCC Projects',
    link: 'https://freecodecamp.ralphlargo.com/',
    type: 'personal',
  },
  {
    name: 'Perfectus',
    link: 'https://perfectus.de',
    type: 'contribution',
  },
];

export default PROJECTS;
