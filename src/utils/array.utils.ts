const projectHasLogoVideo = (project: ProjectType) => {
  return project.expand.logo?.expand.media.filter((media) => media.type === 'video').length > 0;
}

const projectMediaArrayHasPDF = (projectMedia: ProjectMediaContent[]) => {
  const numOfDocuments = projectMedia.filter((r) => r.expand.media.filter((f) => f.type === 'pdf').length > 0).length;
  return numOfDocuments > 0;
}

const projectMediaArrayByFileType = (projectMedia: ProjectMediaContent[], type: 'image' | 'pdf' | 'video' | 'embed'): ProjectMedia[] => {
  const projectMediaArray = <ProjectMedia[]>[];
  projectMedia.forEach((r) => r.expand.media.forEach((m) => {
    if (m.type === type) {
      projectMediaArray.push(m);
    }
  }));
  return projectMediaArray;
}

const shouldBeCarouselProjectMediaContent = (projectMedia: ProjectMediaContent) => {
  const numImages = projectMedia?.expand.media?.filter((m) => m.type === 'image').length;
  return numImages > 1;
}

const shouldBeCarouselProjectMediaArray = (projectMedia: ProjectMedia[]) => {
  const numImages = projectMedia?.filter((m) => m.type === 'image').length;
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

const projectMediaContentToProjectMediaArray = (projectMedia: ProjectMediaContent[]): ProjectMedia[] => {
  const projectMediaArray = <ProjectMedia[]>[];
  projectMedia.forEach((r) => r.expand.media.forEach((m) => {
    projectMediaArray.push(m);
  }));
  return projectMediaArray;
}

export {
  projectHasLogoVideo, projectMediaArrayByFileType, projectMediaArrayHasEmbed, projectMediaArrayHasPDF, projectMediaArrayWithEmbed, projectMediaArrayWithoutEmbed, projectMediaContentToProjectMediaArray, projectMediaWithEmbed, projectMediaWithoutEmbed, shouldBeCarouselProjectMediaArray, shouldBeCarouselProjectMediaContent
};

