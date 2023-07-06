import React from 'react'
import { projectMediaArrayHasPDF, projectMediaArrayWithoutEmbed, shouldBeCarousel } from '../utils/array.utils'
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
        {research.filter((r) => !r.expand.media.find((m) => m.type === 'embed')).map((research) =>
          <div className="flex flex-col break-all max-w-full" key={research.id}>
            <h4 className="font-light text-2xl mb-2">{research.content}</h4>
          </div>
        )}
      </GridBox>
      <GridBox variant={projectMediaArrayHasPDF(research) ? 'default' : 'no-padding'} background="white" className={`${projectMediaArrayHasPDF(research) ? '' : 'lg:h-[45rem]'}`}>
        {projectMediaArrayWithoutEmbed(research).map((r) =>
          <>
            {shouldBeCarousel(r) ?
              <ImageCarousel key={r.id} images={r.expand.media.map((m) => getImage(m, m.media!))} />
              :
              <>
                {r.expand.media.map((media) =>
                  <div key={media.id} className="w-full h-[70vh] lg:h-full relative">
                    <ProjectMedia size={'full'} media={media} />
                  </div>
                )}
              </>
            }

          </>
        )}
      </GridBox>
    </GridContainer>
  )
}

export default ResearchContainer