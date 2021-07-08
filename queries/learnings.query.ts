export const LEARNINGS = `
    *[_type == "blogs"] | order(_createdAt desc) {
        _id,
        name,
        "imageUrl": image.asset->url,
        notionId,
        "banner": banner.asset->url,
    }
`;

export const LEARNINGS_BY_ID = `
    *[_type == "blogs" && notionId == $notionId]  {
        _id,
        name,
        "imageUrl": image.asset->url,
        notionId,
        "banner": banner.asset->url,
    }
`;
