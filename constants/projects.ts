type Projects = {
  name: string;
  link: string;
  type: 'contribution' | 'clones' | 'personal';
  ongoing?: boolean;
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
  {
    name: 'Twice Polls',
    link: 'https://twicepolls.com/polls',
    type: 'personal',
    ongoing: true,
  },
  {
    name: 'Friend Finder',
    link: 'http://social-network.ralphlargo.com/',
    type: 'personal',
    ongoing: true,
  },
  {
    name: 'Movie Database Admin',
    link: 'https://mdb-admin.vercel.app',
    type: 'personal',
    ongoing: true,
  },
  {
    name: 'Pokedocs',
    link: 'https://pokedocs.vercel.app',
    type: 'personal',
    ongoing: true,
  },
];

export default PROJECTS;
