const projectHasLogoVideo = (project: ProjectType) => {
  return project.expand.logo.expand.media.filter((media) => media.type === 'video').length > 0;
}

export { projectHasLogoVideo };

