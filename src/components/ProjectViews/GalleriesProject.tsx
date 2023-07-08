import React from 'react';
import { truncate } from '../../utils/general.utils';
import { getImage, getImageThumb } from '../../utils/pb.utils';
import GridBox from '../GridBox';
import GridBoxHeader from '../GridBoxHeader';
import GridContainer from '../GridContainer';
import ImageCarousels from '../ImageCarousels';

type Props = {
  project: ProjectType;
}

const GalleriesProject: React.FC<Props> = ({ project }) => {
  const { galleries } = project.expand;
  const slidesArray: {
    title: string;
    images: string[];
  }[] = [];
  const thumbsArray: {
    title: string;
    images: string[];
  }[] = [];
  for (const gallery of galleries) {
    const urls = {
      title: gallery.title,
      images: gallery.gallery_images.map((g) => getImage(gallery, g))
    }
    const thumbsUrls = {
      title: gallery.title,
      images: gallery.gallery_images.map((g) => getImageThumb(gallery, g))
    }
    slidesArray.push(urls);
    thumbsArray.push(thumbsUrls);
  }

  return (
    <GridContainer cols={3}>
      <GridBox variant="no-padding" background="transparent" className="col-span-2">
        <div className="w-full h-full lg:h-full relative">
          <ImageCarousels slides={slidesArray} thumbs={thumbsArray} />
        </div>
      </GridBox>
      <div style={{
        backgroundImage: `url('${getImage(project, project.cover_image)}')`,
        backgroundPosition: 'center'
      }} id="projects"
      >
        <GridBox variant="no-padding" background="transparent" className="backdrop-brightness-[15%] p-14">
          <GridBoxHeader>About</GridBoxHeader>
          <div className="overflow-y-scroll max-h-[40rem]" dangerouslySetInnerHTML={{ __html: project.about }} />
          {project.gallery_documents?.map((document, index) => {
            return (
              <a key={document + index} style={{
                color: project.expand.colors.project_theme_color
              }} className="link text-lg w-fit flex items-center gap-x-1" target="_blank" href={getImage(project, document!)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                {truncate(document, 25)}
              </a>
            )
          })}
        </GridBox>
      </div>
    </GridContainer >
  )
}

export default GalleriesProject