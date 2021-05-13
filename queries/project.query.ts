export const PROJECTS = `
    *[_type == "project"] {
        _id,
        name,
        slug,
        websiteUrl,
        image,
        "imageUrl": image.asset->url,
        projectType->{
        name
        }
    }
`;

export const PROJECTS_BY_TYPE = `
    *[_type == "project" && projectType._ref == $projectTypeId] | order(_createdAt asc) {
        _id,
        name,
        slug,
        websiteUrl,
        image,
        "imageUrl": image.asset->url,
        projectType->{
        name
        }
    }
`;

export const PROJECT_TYPES = `
    *[_type == "projectType"] {
        _id,
        name
    }
`;
