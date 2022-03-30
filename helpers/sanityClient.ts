import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: process.env.NEXT_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_SANITY_DATASET,
  apiVersion: "2019-01-29",
  token: process.env.NEXT_SANITY_TOKEN,
  useCdn: true,
});

export default client;
