import pb from "@/utils/pb.config";
import { Metadata } from "next";
import Link from "next/link";
import ImageCarousel from "../../../components/EmblaCarousel/ImageCarousel";
import FigmaPrototype from "../../../components/FigmaPrototype";
import GridBox from "../../../components/GridBox";
import GridBoxHeader from "../../../components/GridBoxHeader";
import GridContainer from "../../../components/GridContainer";
import ProjectMedia from "../../../components/ProjectMedia";
import Spinner from "../../../components/Spinner";
import { projectHasLogoVideo, projectMediaContentHasPDF } from "../../../utils/array.utils";
import { getImage } from "../../../utils/pb.utils";

export const metadata: Metadata = {
  title: 'Sirine Harzallah - Portfolio',
  description: 'Personal portfolio website of Sirine Harzallah',
  icons: [
    {
      rel: "icon",
      type: "image/ico",
      sizes: "32x32",
      url: "/favicon.ico"
    },
    {
      rel: "icon",
      url: "/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      url: "/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    }
  ],
}

export const revalidate = 60

async function getProject(projectId: string): Promise<ProjectType> {
  const res = await pb.collection('projects').getOne(projectId, {
    expand: 'affinity_map,brand_colors,colors,findings,font_family,high_fidelity_mock_ups,iconography,interactive_prototype,logo,navigation_map,persona,primary_research,secondary_research,user_flow,user_scenario,primary_research.media,secondary_research.media,logo.media,brand_colors.media,iconography.media'
  }) as ProjectType;

  if (!res) {
    throw new Error(`Failed to fetch project: ${projectId}`);
  }

  return res;
}

export default async function Page({ params }: { params: { project: string } }) {
  const project = await getProject(params.project);

  if (!project) return <Spinner />

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
    <div className="flex flex-col items-center">
      <div style={{
        backgroundImage: `url('${getImage(project, project.cover_image)}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }} id="projects" className="grid grid-cols-1 lg:grid-cols-1 h-[100vh] lg:h-[50vh] w-full">
        <GridBox variant="center" background='transparent' className="bg-black bg-opacity-50">
          <div className="text-sm breadcrumbs text-white">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li>{project.title}</li>
            </ul>
          </div>
          <h1 className="font-extrabold text-[4rem] lg:text-[6rem] w-fit text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">{project.title}</h1>
        </GridBox>
      </div>
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
      <GridContainer cols={primary_research.filter((r) => r.expand.media.find((f) => f.type === 'pdf')).length > 0 ? 2 : 1}>
        <GridBox spotlight={true} background="gray">
          <GridBoxHeader>Research</GridBoxHeader>
          <div className={`${primary_research.filter((r) => r.expand.media.find((f) => f.type === 'pdf')).length > 0 ? 'w-full' : 'lg:w-[50%]'}`} dangerouslySetInnerHTML={{ __html: project.research_goals }} />
        </GridBox>
      </GridContainer>
      <GridContainer cols={2}>
        <GridContainer cols={1}>
          <GridBox background="white" className="lg:h-[20rem]">
            <GridBoxHeader color="gray">Primary Research</GridBoxHeader>
            {primary_research.filter((r) => !r.expand.media.find((m) => m.type === 'embed')).map((research) =>
              <div className="flex flex-col break-all max-w-full" key={research.id}>
                <h4 className="font-light text-2xl mb-2">{research.content}</h4>
              </div>
            )}
          </GridBox>
          <GridBox variant={projectMediaContentHasPDF(primary_research) ? 'default' : 'no-padding'} background="white">
            {primary_research.filter((r) => !r.expand.media.find((m) => m.type === 'embed')).map((research) =>
              <>
                {research.expand.media.filter((m) => m.type === 'image').length > 0 &&
                  <ImageCarousel key={research.id} images={research.expand.media.map((m) => getImage(m, m.media!))} />
                }
                {research.expand.media.map((m) =>
                  m.type === 'pdf' && <ProjectMedia key={m.id} media={m} />
                )}
              </>
            )}
          </GridBox>
        </GridContainer>
        <GridContainer cols={1}>
          <GridBox background="white" className="lg:h-[20rem]">
            <GridBoxHeader color="gray">Secondary Research</GridBoxHeader>
            {secondary_research.filter((r) => !r.expand.media.find((m) => m.type === 'embed')).map((research) =>
              <div className="flex flex-col break-all max-w-full" key={research.id}>
                <h4 className="font-light text-2xl mb-2">{research.content}</h4>
              </div>
            )}
          </GridBox>
          <GridBox variant={projectMediaContentHasPDF(secondary_research) ? 'default' : 'no-padding'} background="white" className="lg:h-[45rem]">
            {secondary_research.filter((r) => r.expand.media.filter((m) => m.type !== 'embed').length).map((research) =>
              <>
                {research.expand.media.filter((media) => media.embed_src === '').map((media) =>
                  <div key={media.id} className="w-full h-[70vh] lg:h-full relative">
                    <ProjectMedia size={'full'} media={media} />
                  </div>
                )}
              </>
            )}
          </GridBox>
        </GridContainer>
      </GridContainer>
      <GridContainer cols={secondary_research.filter((s) => s.expand.media.filter((sc) => sc.type === 'embed').length > 0).length > 0 ? 2 : 1}>
        <GridBox background="transparent" variant="no-padding">
          {secondary_research.map((research) =>
            <div key={research.id}>
              {research.expand.media.filter((media) => media.type === 'embed').map((media) =>
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
      <GridContainer cols={2}>
        <GridBox spotlight={true} background="gray">
          <GridBoxHeader>Key Insights</GridBoxHeader>
          <div dangerouslySetInnerHTML={{ __html: project.key_insights }} />
        </GridBox>
        <GridBox variant="no-padding" background="transparent">
          <ImageCarousel images={findings.map((finding) => getImage(finding, finding.media!))} />
        </GridBox>
      </GridContainer>
      <GridContainer cols={2}>
        <GridBox variant="no-padding" background="white" className="order-last lg:order-first">
          <div className="w-full h-[40vh] lg:h-full relative">
            <ImageCarousel images={[getImage(persona, persona.media!)]} />
          </div>
        </GridBox>
        <GridBox spotlight={true} variant="center" position="end" background="gray" className="order-first">
          <GridBoxHeader>Persona</GridBoxHeader>
        </GridBox>
      </GridContainer>
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
      <GridContainer cols={2}>
        <GridBox variant="center" background="white">
          <GridBoxHeader color='gray'>Brand Guidelines</GridBoxHeader>
        </GridBox>
        <GridBox background="transparent">
          <GridBoxHeader>About</GridBoxHeader>
          <div dangerouslySetInnerHTML={{ __html: project.about }} />
        </GridBox>
      </GridContainer>
      <GridContainer cols={projectHasLogoVideo(project) ? 3 : 2}>
        <GridContainer cols={logo.expand.media.filter((media) => media.type === 'image').length / 2} className="order-last lg:order-first">
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
      <GridContainer cols={3}>
        <GridBox variant="no-padding" background="white" className="p-10 lg:p-20 h-[40vh] lg:h-full order-last lg:order-first">
          {iconography[0].expand.media.filter((media) => media.type === 'image').map((media) =>
            <div key={media.id} className="w-full h-[40vh] lg:h-full relative">
              <ImageCarousel images={[getImage(media, media.media!)]} />
            </div>
          )}
        </GridBox>
        <GridBox variant="no-padding" background="white" className="p-10 lg:p-20 h-[40vh] lg:h-full order-last lg:order-first">
          <div className="w-full h-[40vh] lg:h-full relative">
            <ImageCarousel images={[getImage(font_family, font_family.media!)]} />
          </div>
        </GridBox>
        <GridBox spotlight={true} background="gray" className="order-first lg:order-last">
          <GridBoxHeader>Iconography & Font Family</GridBoxHeader>
          <div dangerouslySetInnerHTML={{ __html: iconography[0].content }} />
        </GridBox>
      </GridContainer>
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
          <ImageCarousel size='full' mockup={true} images={high_fidelity_mock_ups.map((mockup) => getImage(mockup, mockup.media!))} />
        </GridBox>
        <GridBox variant="no-padding" background="gray">
          <div className="relative w-full h-full">
            <FigmaPrototype url={interactive_prototype.embed_src} />
          </div>
        </GridBox>
      </div>
    </div >
  )
}
