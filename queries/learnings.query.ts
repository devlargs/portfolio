export const LEARNINGS = `
*[_type == "learnings"]{
    _id,
    name,
    'slug': slug.current,
    image,
    "imageUrl": image.asset->url,
    content[]{...,  'asset': asset->}
}
`;

export const LEARNINGS_BY_ID = `
*[_type == "learnings" && slug.current == $slug ]{
    _id,
    name,
    'slug': slug.current,,
    image,
    "imageUrl": image.asset->url,
    content[]{...,  'asset': asset->}
}
`;
