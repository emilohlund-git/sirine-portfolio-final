import React from 'react'
import { projectHasLogoVideo, shouldBeCarouselProjectMediaArray } from '../utils/array.utils'
import { getImage, getImageThumb } from '../utils/pb.utils'
import ImageCarousel from './EmblaCarousel/ImageCarousel'
import FigmaPrototype from './FigmaPrototype'
import GridBox from './GridBox'
import GridBoxHeader from './GridBoxHeader'
import GridContainer from './GridContainer'
import ProjectMedia from './ProjectMedia'
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
          <GridContainer cols={2}>
            <GridBox spotlight={true} background="gray">
              <GridBoxHeader>Research</GridBoxHeader>
              <div dangerouslySetInnerHTML={{ __html: project.research_goals }} />
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
      {findings &&
        <GridContainer cols={2}>
          <GridBox spotlight={true} background="gray">
            <GridBoxHeader>Key Insights</GridBoxHeader>
            <div dangerouslySetInnerHTML={{ __html: project.key_insights }} />
          </GridBox>
          <GridBox variant="no-padding" background="transparent">
            {
              shouldBeCarouselProjectMediaArray(findings) ?
                <ImageCarousel images={findings.map((m) => getImage(m, m.media!))} className="h-[40rem]" />
                :
                <ProjectMedia media={findings[0]} className="h-[40rem] object-contain" />
            }
          </GridBox>
        </GridContainer>
      }
      {persona && affinity_map && user_flow && navigation_map &&
        <GridContainer cols={2}>
          <GridBox variant="no-padding" background="white" className="order-last lg:order-first">
            <div className="w-full h-[40vh] lg:h-full relative">
              <ProjectMedia media={persona.expand.media[0]} className="h-[40rem]" style={{
                objectFit: 'contain'
              }} />
            </div>
          </GridBox>
          <GridBox spotlight={true} background="gray" className="order-first">
            <GridBoxHeader>Persona</GridBoxHeader>
            <div dangerouslySetInnerHTML={{ __html: persona.content }} />
          </GridBox>
        </GridContainer>
      }
      {affinity_map &&
        <GridContainer cols={2}>
          <GridBox spotlight={true} background="gray" className="items-center lg:items-start">
            <GridBoxHeader>Affinity Map</GridBoxHeader>
            <div dangerouslySetInnerHTML={{ __html: affinity_map.content }} />
          </GridBox>
          <GridBox variant="no-padding" background="white">
            <div className="w-full h-[40vh] lg:h-full relative bg-[#ededf1]">
              <ProjectMedia media={affinity_map.expand.media[0]} className="h-[40rem]" style={{
                objectFit: 'contain'
              }} />
            </div>
          </GridBox>
        </GridContainer>
      }
      {user_flow &&
        <GridContainer cols={2}>
          <GridBox variant="no-padding" background="white" className="order-last lg:order-first">
            <div className="w-full h-[40vh] lg:h-full relative bg-[#fff]">
              <ProjectMedia media={user_flow.expand.media[0]} className="h-[40rem]" style={{
                objectFit: 'contain'
              }} />
            </div>
          </GridBox>
          <GridBox spotlight={true} background="gray">
            <GridBoxHeader>User Flow</GridBoxHeader>
            <div dangerouslySetInnerHTML={{ __html: user_flow.content }} />
          </GridBox>
        </GridContainer>
      }
      {navigation_map &&
        <GridContainer cols={2}>
          <GridBox spotlight={true} background="gray" className="items-center lg:items-start">
            <GridBoxHeader>Navigation Map</GridBoxHeader>
            <div dangerouslySetInnerHTML={{ __html: navigation_map.content }} />
          </GridBox>
          <GridBox variant="no-padding" background="white">
            <div className="w-full h-[40vh] lg:h-full relative bg-[#fdfdfd]">
              <ProjectMedia media={navigation_map.expand.media[0]} className="h-[40rem]" style={{
                objectFit: 'contain'
              }} />
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
                  <ProjectMedia media={media} className="h-[20rem] object-contain" style={{
                    objectFit: 'contain'
                  }} />
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
                <ProjectMedia media={media} className="h-[40rem]" style={{
                  objectFit: 'contain'
                }} />
              </div>
            )}
          </GridBox>
        </GridContainer>
      }
      {iconography && font_family &&
        <GridContainer cols={3}>
          <GridBox variant="no-padding" background="white" className="p-10 lg:p-20 h-[40vh] lg:h-full order-last lg:order-first">
            {iconography[0].expand.media.filter((media) => media.type === 'image').map((media) =>
              <div key={media.id} className="w-full h-[40rem] lg:h-full relative">
                <ProjectMedia media={media} className="h-[40rem]" style={{
                  objectFit: 'contain'
                }} />
              </div>
            )}
          </GridBox>
          <GridBox variant="no-padding" background="white" className="flex justify-center items-center p-10 lg:p-20 h-[40vh] lg:h-full order-last lg:order-first">
            <div className="w-full h-full lg:h-full relative">
              <ImageCarousel images={font_family.map((fm) => getImage(fm, fm.media!))} className="h-[35rem]" style={{
                objectFit: 'contain'
              }} />
            </div>
          </GridBox>
          <GridBox spotlight={true} background="gray" className="order-first lg:order-last">
            <GridBoxHeader>Iconography & Font Family</GridBoxHeader>
            <div dangerouslySetInnerHTML={{ __html: iconography[0].content }} />
          </GridBox>
        </GridContainer>
      }
      {interactive_prototype &&
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
            <GridBox variant="no-padding" background="transparent">
              <div className="w-full h-[50rem] lg:h-full relative">
                <ImageCarousel className="h-[40rem]" size='full' mockup={true} images={project.high_fidelity_mock_ups.map((mockup) => getImage(project, mockup!))} />
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
              <ImageCarousel className="h-[80vh]" images={project.gallery.map((g) => getImage(project, g))} thumbs={project.gallery.map((g) => getImageThumb(project, g))} />
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