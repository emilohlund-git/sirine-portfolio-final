const projectHasLogoVideo = (project: ProjectType) => {
  return project.expand.logo?.expand.media.filter((media) => media.type === 'video').length > 0;
}

const projectMediaArrayHasPDF = (projectMedia: ProjectMediaContent[]) => {
  const numOfDocuments = projectMedia.filter((r) => r.expand.media.filter((f) => f.type === 'pdf').length > 0).length;
  return numOfDocuments > 0;
}

const shouldBeCarousel = (projectMedia: ProjectMediaContent) => {
  const numImages = projectMedia?.expand.media?.filter((m) => m.type === 'image').length;
  return numImages > 1;
}

const projectMediaArrayHasEmbed = (projectMedia: ProjectMediaContent[]) => {
  const numEmbeds = projectMedia?.filter((r) => r.expand.media.find((m) => m.type === 'embed')).length;
  return numEmbeds > 0;
}

const projectMediaArrayWithEmbed = (projectMedia: ProjectMediaContent[]) => {
  const withEmbeds = projectMedia?.filter((r) => r.expand.media.find((m) => m.type === 'embed'));
  return withEmbeds;
}

const projectMediaArrayWithoutEmbed = (projectMedia: ProjectMediaContent[]) => {
  const withoutEmbeds = projectMedia?.filter((r) => !r.expand.media.find((m) => m.type === 'embed'));
  return withoutEmbeds;
}

const projectMediaWithoutEmbed = (projectMedia: ProjectMediaContent) => {
  const withoutEmbeds = projectMedia?.expand.media?.filter((r) => r.type !== 'embed');
  return withoutEmbeds;
}

const projectMediaWithEmbed = (projectMedia: ProjectMediaContent) => {
  const withEmbeds = projectMedia?.expand.media?.find((m) => m.type === 'embed');
  return withEmbeds;
}

export {
  projectHasLogoVideo,
  projectMediaArrayHasEmbed,
  projectMediaArrayHasPDF, projectMediaArrayWithEmbed, projectMediaArrayWithoutEmbed, projectMediaWithEmbed, projectMediaWithoutEmbed,
  shouldBeCarousel
};

