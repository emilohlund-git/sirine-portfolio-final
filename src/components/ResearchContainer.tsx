import React from 'react'
import { projectMediaArrayByFileType, shouldBeCarouselProjectMediaArray } from '../utils/array.utils'
import { getImage } from '../utils/pb.utils'
import ImageCarousel from './EmblaCarousel/ImageCarousel'
import GridBox from './GridBox'
import GridBoxHeader from './GridBoxHeader'
import GridContainer from './GridContainer'
import ProjectMedia from './ProjectMedia'

type Props = {
  research: ProjectMediaContent[];
  title: string;
}

const ResearchContainer: React.FC<Props> = ({ research, title }) => {
  const PDFDocuments = projectMediaArrayByFileType(research, 'pdf');
  const images = projectMediaArrayByFileType(research, 'image');
  const embeds = projectMediaArrayByFileType(research, 'embed');
  const videos = projectMediaArrayByFileType(research, 'video');

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
    <GridContainer cols={10} className="flex">
      <GridBox background="white" className="grid col-span-10 h-[22rem]">
        <GridBoxHeader color="gray">{title}</GridBoxHeader>
        {research.map((research) =>
          <div className="flex flex-col break-all max-w-full" key={research.id}>
            <h4 className="font-light text-2xl mb-2">{research.content}</h4>
          </div>
        )}
      </GridBox>
      <GridContainer className="flex col-span-10 lg:h-[50rem]">
        {media.map((mediaTypeGroup, index) => {
          if (mediaTypeGroup[0]) {
            return (<GridBox key={index} variant={getVariant(mediaTypeGroup[0]?.type)} background="white" className={`flex flex-grow h-full ${mediaTypeGroup[0].type === 'pdf' && ''}`}>
              {shouldBeCarouselProjectMediaArray(mediaTypeGroup) && (
                <div className="w-full h-[40vh] lg:h-full relative">
                  <ImageCarousel images={mediaTypeGroup.map((m) => getImage(m, m.media!))} className="h-[40rem]" />
                </div>)
              }
              <div className="w-full h-[40vh] lg:h-full relative">
                {!shouldBeCarouselProjectMediaArray(mediaTypeGroup) && mediaTypeGroup.map((mediaType) => {
                  return (
                    <ProjectMedia key={mediaType.id} media={mediaType} className="h-[40rem]" style={{
                      objectFit: 'contain'
                    }} />
                  )
                })}
              </div>
            </GridBox >)
          }
        })}
      </GridContainer>
    </GridContainer>
  )
}

export default ResearchContainer