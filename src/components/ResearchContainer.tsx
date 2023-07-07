import React from 'react'
import { projectMediaArrayByFileType, projectMediaArrayHasPDF, shouldBeCarouselProjectMediaArray } from '../utils/array.utils'
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
  return (
    <GridContainer cols={1}>
      <GridBox background="white" className="lg:h-[20rem]">
        <GridBoxHeader color="gray">{title}</GridBoxHeader>
        {research.map((research) =>
          <div className="flex flex-col break-all max-w-full" key={research.id}>
            <h4 className="font-light text-2xl mb-2">{research.content}</h4>
          </div>
        )}
      </GridBox>
      {projectMediaArrayHasPDF(research) &&
        <GridBox variant={'default'} background="white">
          {projectMediaArrayByFileType(research, 'pdf').map((m) =>
            <>
              <ProjectMedia key={m.id} media={m} />
            </>
          )}
        </GridBox>
      }
      {projectMediaArrayByFileType(research, 'image').length > 0 &&
        <GridBox variant={'no-padding'} background="white" className={`lg:h-[40rem] place-content-center`}>
          {projectMediaArrayByFileType(research, 'image').map((r) => {
            const mediaArray = projectMediaArrayByFileType(research, 'image');

            return (
              <>
                {shouldBeCarouselProjectMediaArray(mediaArray) ?
                  <ImageCarousel key={r.id} images={mediaArray.map((m) => getImage(m, m.media!))} className="h-[30rem]" style={{
                    objectFit: 'contain'
                  }} />
                  :
                  <ProjectMedia key={r.id} media={r} className="h-[30rem]" />
                }
              </>
            )
          }
          )}
        </GridBox>
      }
      <GridBox variant={'no-padding'} background="white" className={`lg:h-[40rem] place-content-center`}>
        {projectMediaArrayByFileType(research, 'embed').map((r) => {
          return (
            <>
              <ProjectMedia key={r.id} media={r} className="h-[30rem]" />
            </>
          )
        }
        )}
      </GridBox>
    </GridContainer>
  )
}

export default ResearchContainer