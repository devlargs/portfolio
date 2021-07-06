export interface ProjectDataProps {
  image: any;
  name: string;
  slug: {
    _type: string;
    current: string;
  };
  websiteUrl: string;
  imageUrl?: string;
  _id: string;
  projectType: {
    name: string;
  };
}
