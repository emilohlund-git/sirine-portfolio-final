import React from 'react';
import { truncate } from '../utils/general.utils';
import { getImage } from '../utils/pb.utils';
import ImageCarousel from './EmblaCarousel/ImageCarousel';

type Props = {
  media: ProjectMedia
}

const ProjectMedia: React.FC<Props> = ({ media }) => {
  const { type } = media;

  switch (type) {
    case 'image': return (
      <ImageCarousel images={[getImage(media, media.media!)]} />
    )
    case 'embed': return (
      <iframe
        className="lg:h-[40rem] h-[50vh] w-full" src={media.embed_src} allowFullScreen
        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
      />
    )
    case 'pdf': return (
      <a className="link link-secondary text-lg w-fit flex items-center gap-x-1" target="_blank" href={getImage(media, media.media!)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
        {truncate(media.media!, 25)}
      </a>
    )
    case 'video': return (
      <video muted className="lg:absolute z-10 w-auto min-w-[150%] min-h-[50%] max-w-[400%]" loop autoPlay src={`${getImage(media, media.media!)}`} />
    )
  }
}

export default ProjectMedia