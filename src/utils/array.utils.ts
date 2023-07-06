const projectHasLogoVideo = (project: ProjectType) => {
  return project.expand.logo.expand.media.filter((media) => media.type === 'video').length > 0;
}

const projectMediaContentHasPDF = (projectMedia: ProjectMediaContent[]) => {
  const numOfDocuments = projectMedia.filter((r) => r.expand.media.filter((f) => f.type === 'pdf').length > 0).length;
  return numOfDocuments > 0;
}

export { projectHasLogoVideo, projectMediaContentHasPDF };

