import React from 'react'
import { projectHasLogoVideo, projectMediaArrayWithEmbed } from '../utils/array.utils'
import { getImage } from '../utils/pb.utils'
import ImageCarousel from './EmblaCarousel/ImageCarousel'
import FigmaPrototype from './FigmaPrototype'
import GridBox from './GridBox'
import GridBoxHeader from './GridBoxHeader'
import GridContainer from './GridContainer'
import ResearchContainer from './ResearchContainer'

type Props = {
  project: ProjectType;
}

const ProcessesProject: React.FC<Props> = ({ project }) => {
  const {
    findings,
    primary_research,
    secondary_research,
    persona,
    affinity_map,
    user_flow,
    navigation_map,
    logo,
    iconography,
    font_family,
    brand_colors,
    high_fidelity_mock_ups,
    interactive_prototype
  } = project.expand;

  return (
    <>
      {project.problem && project.potential_solution &&
        <>
          <GridContainer cols={2}>
            <GridBox background='transparent'>
              <GridBoxHeader>Problem</GridBoxHeader>
              <div dangerouslySetInnerHTML={{ __html: project.problem }} />
            </GridBox>
            <GridBox spotlight={true} background='gray'>
              <GridBoxHeader>Potential Solution</GridBoxHeader>
              <div dangerouslySetInnerHTML={{ __html: project.potential_solution }} />
            </GridBox>
          </GridContainer >
          <GridContainer cols={primary_research?.filter((r) => r.expand.media.find((f) => f.type === 'pdf')).length > 0 ? 2 : 1}>
            <GridBox spotlight={true} background="gray">
              <GridBoxHeader>Research</GridBoxHeader>
              <div className={`${primary_research?.filter((r) => r.expand.media.find((f) => f.type === 'pdf')).length > 0 ? 'w-full' : 'lg:w-[50%]'}`} dangerouslySetInnerHTML={{ __html: project.research_goals }} />
            </GridBox>
          </GridContainer>
        </>
      }
      {primary_research && secondary_research &&
        <GridContainer cols={2}>
          <ResearchContainer research={primary_research} title="Primary Research" />
          <ResearchContainer research={secondary_research} title="Secondary Research" />
        </GridContainer>
      }
      {secondary_research &&
        <GridContainer cols={secondary_research?.filter((s) => s.expand.media.filter((sc) => sc.type === 'embed').length > 0).length > 0 ? 2 : 1}>
          <GridBox background="transparent" variant="no-padding">
            {projectMediaArrayWithEmbed(secondary_research)?.map((research) =>
              <div key={research.id}>
                {research.expand.media.map((media) =>
                  <iframe key={media.id}
                    className="lg:h-[40rem] h-[50vh] w-full" src={media.embed_src} allowFullScreen
                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                  />
                )}
              </div>
            )}
          </GridBox>
          <GridBox spotlight={true} variant="center" position="end" background="gray">
            <GridBoxHeader color="gradient">{project.slogan}</GridBoxHeader>
          </GridBox>
        </GridContainer>
      }
      {findings &&
        <GridContainer cols={2}>
          <GridBox spotlight={true} background="gray">
            <GridBoxHeader>Key Insights</GridBoxHeader>
            <div dangerouslySetInnerHTML={{ __html: project.key_insights }} />
          </GridBox>
          <GridBox variant="no-padding" background="transparent">
            <ImageCarousel images={findings?.map((finding) => getImage(finding, finding.media!))} />
          </GridBox>
        </GridContainer>
      }
      {persona && affinity_map && user_flow && navigation_map &&
        <GridContainer cols={2}>
          <GridBox variant="no-padding" background="white" className="order-last lg:order-first">
            <div className="w-full h-[40vh] lg:h-full relative">
              <ImageCarousel images={[getImage(persona, persona?.media!)]} />
            </div>
          </GridBox>
          <GridBox spotlight={true} variant="center" position="end" background="gray" className="order-first">
            <GridBoxHeader>Persona</GridBoxHeader>
          </GridBox>
        </GridContainer>
      }
      {affinity_map &&
        <GridContainer cols={2}>
          <GridBox spotlight={true} variant="center" background="gray" className="items-center lg:items-start">
            <GridBoxHeader>Affinity Map</GridBoxHeader>
          </GridBox>
          <GridBox variant="no-padding" background="white">
            <div className="w-full h-[40vh] lg:h-full relative bg-[#ededf1]">
              <ImageCarousel images={[getImage(affinity_map, affinity_map.media!)]} />
            </div>
          </GridBox>
        </GridContainer>
      }
      {user_flow &&
        <GridContainer cols={2}>
          <GridBox variant="no-padding" background="white" className="order-last lg:order-first">
            <div className="w-full h-[40vh] lg:h-full relative bg-[#fff]">
              <ImageCarousel images={[getImage(user_flow, user_flow.media!)]} />
            </div>
          </GridBox>
          <GridBox spotlight={true} position="end" variant="center" background="gray">
            <GridBoxHeader>User Flow</GridBoxHeader>
          </GridBox>
        </GridContainer>
      }
      {navigation_map &&
        <GridContainer cols={2}>
          <GridBox spotlight={true} variant="center" background="gray" className="items-center lg:items-start">
            <GridBoxHeader>Navigation Map</GridBoxHeader>
          </GridBox>
          <GridBox variant="no-padding" background="white">
            <div className="w-full h-[40vh] lg:h-full relative bg-[#fdfdfd]">
              <ImageCarousel images={[getImage(navigation_map, navigation_map.media!)]} />
            </div>
          </GridBox>
        </GridContainer>
      }
      {project.problem &&
        <GridContainer cols={2}>
          <GridBox variant="center" background="white">
            <GridBoxHeader color='gray'>Brand Guidelines</GridBoxHeader>
          </GridBox>
          <GridBox background="transparent">
            <GridBoxHeader>About</GridBoxHeader>
            <div dangerouslySetInnerHTML={{ __html: project.about }} />
          </GridBox>
        </GridContainer>
      }
      {logo &&
        <GridContainer cols={projectHasLogoVideo(project) ? 3 : 2}>
          <GridContainer cols={logo?.expand.media.filter((media) => media.type === 'image').length / 2} className="order-last lg:order-first">
            {logo.expand.media.filter((media) => media.type === 'image').map((media, index) =>
              <GridBox key={media.id} variant="no-padding" background="white" className="p-10">
                <div className="w-full h-[40vh] lg:h-full relative">
                  <ImageCarousel size={'small'} images={[getImage(media, media.media!)]} />
                </div>
              </GridBox>
            )}
          </GridContainer>
          {projectHasLogoVideo(project) ?
            <GridBox variant="no-padding" background="transparent" className="items-center justify-center h-[100vh] w-[100vw] lg:h-full lg:w-full">
              <video muted className="lg:absolute z-10 w-auto min-w-[150%] min-h-[50%] max-w-[400%]" loop autoPlay src={`${getImage(logo.expand.media.find((media) => media.type === 'video'), logo.expand.media.find((media) => media.type === 'video')!.media!)}`} />
            </GridBox>
            :
            null
          }
          <GridBox spotlight={true} background="gray" className="order-first lg:order-last">
            <GridBoxHeader>Logo</GridBoxHeader>
            <div dangerouslySetInnerHTML={{ __html: logo.content }} />
          </GridBox>
        </GridContainer>
      }
      {brand_colors &&
        <GridContainer cols={2}>
          <GridBox spotlight={true} background="gray">
            <GridBoxHeader>Brand Colors</GridBoxHeader>
            <div dangerouslySetInnerHTML={{ __html: brand_colors.content }} />
          </GridBox>
          <GridBox variant="no-padding" background="white" className="h-[40vh] lg:h-full">
            {brand_colors.expand.media.filter((media) => media.type === 'image').map((media) =>
              <div key={media.id} className="w-full h-[40vh] lg:h-full relative">
                <ImageCarousel images={[getImage(media, media.media!)]} />
              </div>
            )}
          </GridBox>
        </GridContainer>
      }
      {iconography && font_family &&
        <GridContainer cols={3}>
          <GridBox variant="no-padding" background="white" className="p-10 lg:p-20 h-[40vh] lg:h-full order-last lg:order-first">
            {iconography[0].expand.media.filter((media) => media.type === 'image').map((media) =>
              <div key={media.id} className="w-full h-[40vh] lg:h-full relative">
                <ImageCarousel images={[getImage(media, media.media!)]} />
              </div>
            )}
          </GridBox>
          <GridBox variant="no-padding" background="white" className="flex justify-center items-center p-10 lg:p-20 h-[40vh] lg:h-full order-last lg:order-first">
            <div className="w-full h-full lg:h-full relative">
              <ImageCarousel images={font_family.map((fm) => getImage(fm, fm.media!))} />
            </div>
          </GridBox>
          <GridBox spotlight={true} background="gray" className="order-first lg:order-last">
            <GridBoxHeader>Iconography & Font Family</GridBoxHeader>
            <div dangerouslySetInnerHTML={{ __html: iconography[0].content }} />
          </GridBox>
        </GridContainer>
      }
      {high_fidelity_mock_ups && interactive_prototype &&
        <>
          <div style={{
            backgroundImage: `url('${getImage(project, project.cover_image)}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }} id="projects" className="grid grid-cols-1 lg:grid-cols-1 h-[100vh] lg:h-[50vh] w-full">
            <GridBox variant="center" background='transparent' className="bg-black bg-opacity-50">
              <GridBoxHeader color="white" size="large">Mockups &<br /> Interactive Prototype</GridBoxHeader>
            </GridBox>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
            <GridBox variant="no-padding" background="white">
              <div className="w-full h-full lg:h-full relative">
                <ImageCarousel size='full' mockup={true} images={high_fidelity_mock_ups.map((mockup) => getImage(mockup, mockup.media!))} />
              </div>
            </GridBox>
            <GridBox variant="no-padding" background="gray">
              <div className="relative w-full h-full">
                <FigmaPrototype url={interactive_prototype.embed_src} />
              </div>
            </GridBox>
          </div>
        </>
      }
      {project.gallery && project.gallery.length > 0 && (
        <GridContainer cols={3}>
          <GridBox variant="no-padding" background="transparent" className="col-span-2">
            <div className="w-full h-full lg:h-full relative">
              <ImageCarousel className="w-[60vw] h-[50vh]" size="large" images={project.gallery.map((g) => getImage(project, g))} />
            </div>
          </GridBox>
          <GridBox background="transparent">
            <GridBoxHeader>About</GridBoxHeader>
            <div dangerouslySetInnerHTML={{ __html: project.about }} />
          </GridBox>
        </GridContainer>
      )
      }
    </>
  )
}

export default ProcessesProject