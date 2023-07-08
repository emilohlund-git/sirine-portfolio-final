import React from 'react';
import { projectMediaArrayByFileType, shouldBeCarouselProjectMediaArray } from '../../utils/array.utils';
import { getImage } from '../../utils/pb.utils';
import ImageCarousel from '../carousel/ImageCarousel';
import GridBox from '../common/GridBox';
import ProjectMedia from './ProjectMedia';

type Props = {
  projectMediaContent: ProjectMediaContent[];
  className?: string;
}

const ProjectMediaGridBox: React.FC<Props> = ({ projectMediaContent, className }) => {
  const PDFDocuments = projectMediaArrayByFileType(projectMediaContent, 'pdf');
  const images = projectMediaArrayByFileType(projectMediaContent, 'image');
  const embeds = projectMediaArrayByFileType(projectMediaContent, 'embed');
  const videos = projectMediaArrayByFileType(projectMediaContent, 'video');

  const media = [PDFDocuments, images, embeds, videos];

  const getVariant = (fileType: FileType) => {
    switch (fileType) {
      case 'embed': return 'no-padding';
      case 'image': return 'no-padding';
      case 'pdf': return 'default';
      case 'video': return 'no-padding';
    }
  }

  return (
    <>
      {media.map((mediaTypeGroup, index) => {
        if (mediaTypeGroup[0]) {
          return (<GridBox key={index} variant={getVariant(mediaTypeGroup[0]?.type)} background="white" className={`${className} ${mediaTypeGroup[0].type === 'pdf' && ''}`}>
            {shouldBeCarouselProjectMediaArray(mediaTypeGroup) && <ImageCarousel images={mediaTypeGroup.map((m) => getImage(m, m.media!))} className="h-[60vh]" />}
            {!shouldBeCarouselProjectMediaArray(mediaTypeGroup) && mediaTypeGroup.map((mediaType) => {
              return (
                <ProjectMedia key={mediaType.id} media={mediaType} className={`${mediaType.type === 'image' && 'h-[60vh]'}`} />
              )
            })}
          </GridBox >)
        }
      })}
    </>
  )
}

export default ProjectMediaGridBox