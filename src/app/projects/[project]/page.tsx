import pb from "@/utils/pb.config";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FigmaPrototype from "../../../components/FigmaPrototype";
import GridBox from "../../../components/GridBox";
import GridContainer from "../../../components/GridContainer";
import ImageCarousel from "../../../components/ImageCarousel";
import Mockup from "../../../components/Mockup";
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
          <h1 className="font-extrabold text-[6rem] w-fit text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">{project.title}</h1>
        </GridBox>
      </div>
      <GridContainer cols={2}>
        <GridBox background='transparent'>
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Problem</h1>
          <div dangerouslySetInnerHTML={{ __html: project.problem }} />
        </GridBox>
        <GridBox spotlight={true} background='gray'>
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Potential Solution</h1>
          <div dangerouslySetInnerHTML={{ __html: project.potential_solution }} />
        </GridBox>
      </GridContainer >
      <GridContainer cols={2}>
        <GridBox background="white">
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-base-300 via-base-100 to-base-200">Media</h1>
          {project.expand.primary_research.map((research) =>
            <div className="flex flex-col" key={research.id}>
              <h4 className="font-light text-2xl mb-2">{research.content}</h4>
              {research.expand.media.map((media) =>
                <a key={media.id} className="link link-secondary text-lg w-fit flex items-center gap-x-1" target="_blank" href={getImage(media, media.media!)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                  {media.media!}
                </a>
              )}
            </div>
          )}
          {project.expand.secondary_research.filter((r) => r.expand.media.filter((m) => m.embed_src === '').length).map((research) =>
            <div className="flex flex-col" key={research.id}>
              <h4 className="font-light text-2xl mb-2">{research.content}</h4>
              {research.expand.media.filter((media) => media.embed_src === '').map((media) =>
                <a key={media.id} className="link link-secondary text-lg w-fit flex items-center gap-x-1" target="_blank" href={getImage(media, media.media!)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                  {media.media!}
                </a>
              )}
            </div>
          )}
        </GridBox>
        <GridBox background="transparent">
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Research</h1>
          <div dangerouslySetInnerHTML={{ __html: project.research_goals }} />
        </GridBox>
      </GridContainer>
      <GridContainer cols={2}>
        <GridBox background="transparent" variant="no-padding">
          {project.expand.secondary_research.map((research) =>
            <div key={research.id}>
              {research.expand.media.filter((media) => media.embed_src !== '').map((media) =>
                <iframe key={media.id}
                  className="lg:h-[37rem] h-full w-full" src={media.embed_src} allowFullScreen
                  sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                />
              )}
            </div>
          )}
        </GridBox>
        <GridBox spotlight={true} variant="center" position="end" background="gray">
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-indigo-200 to-purple-200">{project.slogan}</h1>
        </GridBox>
      </GridContainer>
      <GridContainer cols={2}>
        <GridBox spotlight={true} background="gray">
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Key Insights</h1>
          <div dangerouslySetInnerHTML={{ __html: project.key_insights }} />
        </GridBox>
        <GridBox variant="no-padding" background="transparent">
          <ImageCarousel images={project.expand.findings.map((finding) => getImage(finding, finding.media!))} />
        </GridBox>
      </GridContainer>
      <GridContainer cols={2}>
        <GridBox variant="no-padding" background="white">
          <div className="w-full h-full relative">
            <Image fill style={{
              objectFit: 'contain'
            }} src={getImage(project.expand.persona, project.expand.persona.media!)} alt={"Project persona"} />
          </div>
        </GridBox>
        <GridBox spotlight={true} variant="center" position="end" background="gray">
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Persona</h1>
        </GridBox>
      </GridContainer>
      <GridContainer cols={2}>
        <GridBox spotlight={true} variant="center" background="gray">
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Affinity Map</h1>
        </GridBox>
        <GridBox variant="no-padding" background="white">
          <div className="w-full h-full relative bg-[#ededf1]">
            <Image fill style={{
              objectFit: 'contain'
            }} src={getImage(project.expand.affinity_map, project.expand.affinity_map.media!)} alt={"Project affinity map"} />
          </div>
        </GridBox>
      </GridContainer>
      <GridContainer cols={2}>
        <GridBox variant="no-padding" background="white">
          <div className="w-full h-full relative bg-[#ededf1]">
            <Image fill style={{
              objectFit: 'contain'
            }} src={getImage(project.expand.user_flow, project.expand.user_flow.media!)} alt={"Project user flow"} />
          </div>
        </GridBox>
        <GridBox spotlight={true} position="end" variant="center" background="gray">
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">User Flow</h1>
        </GridBox>
      </GridContainer>
      <GridContainer cols={2}>
        <GridBox spotlight={true} variant="center" background="gray">
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Navigation Map</h1>
        </GridBox>
        <GridBox variant="no-padding" background="white">
          <div className="w-full h-full relative bg-[#fdfdfd]">
            <Image fill style={{
              objectFit: 'contain'
            }} src={getImage(project.expand.navigation_map, project.expand.navigation_map.media!)} alt={"Project navigation map"} />
          </div>
        </GridBox>
      </GridContainer>
      <GridContainer cols={2}>
        <GridBox variant="center" background="white">
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-base-300 via-base-100 to-base-200">Brand Guidelines</h1>
        </GridBox>
        <GridBox background="transparent">
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">About</h1>
          <div dangerouslySetInnerHTML={{ __html: project.about }} />
        </GridBox>
      </GridContainer>
      <GridContainer cols={3}>
        <GridContainer cols={project.expand.logo.expand.media.filter((media) => media.type === 'image').length / 2}>
          {project.expand.logo.expand.media.filter((media) => media.type === 'image').map((media, index) =>
            <GridBox key={media.id} variant="no-padding" background="white">
              <Image fill className="object-scale-down p-10" src={getImage(media, media.media!)} alt="Logo" />
            </GridBox>
          )}
        </GridContainer>
        <GridBox variant="no-padding" background="transparent" className="items-center justify-center">
          <video muted className="absolute z-10 -top-[30rem] w-auto min-w-[50%] min-h-[50%] max-w-[400%]" loop autoPlay src={`${getImage(project.expand.logo.expand.media.find((media) => media.type === 'video'), project.expand.logo.expand.media.find((media) => media.type === 'video')!.media!)}`} />
        </GridBox>
        <GridBox spotlight={true} background="gray">
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Logo</h1>
          <div dangerouslySetInnerHTML={{ __html: project.expand.logo.content }} />
        </GridBox>
      </GridContainer>
      <GridContainer cols={2}>
        <GridBox spotlight={true} background="gray">
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Brand colors</h1>
          <div dangerouslySetInnerHTML={{ __html: project.expand.brand_colors.content }} />
        </GridBox>
        <GridBox variant="no-padding" background="white">
          {project.expand.brand_colors.expand.media.filter((media) => media.type === 'image').map((media) =>
            <div key={media.id} className="w-full h-full relative">
              <Image fill style={{
                objectFit: 'contain'
              }} src={getImage(media, media.media!)} alt={"Logo"} />
            </div>
          )}
        </GridBox>
      </GridContainer>
      <GridContainer cols={3}>
        <GridBox variant="no-padding" background="white" className="p-20">
          {project.expand.iconography[0].expand.media.filter((media) => media.type === 'image').map((media) =>
            <div key={media.id} className="w-full h-full relative">
              <Image fill style={{
                objectFit: 'contain'
              }} src={getImage(media, media.media!)} alt={"Logo"} />
            </div>
          )}
        </GridBox>
        <GridBox variant="no-padding" background="white" className="p-20">
          <div className="w-full h-full relative">
            <Image fill style={{
              objectFit: 'contain'
            }} src={getImage(project.expand.font_family, project.expand.font_family.media!)} alt={"Logo"} />
          </div>
        </GridBox>
        <GridBox spotlight={true} background="gray">
          <h1 className="font-extrabold text-5xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Iconography & Font Family</h1>
          <div dangerouslySetInnerHTML={{ __html: project.expand.iconography[0].content }} />
        </GridBox>
      </GridContainer>
      <div style={{
        backgroundImage: `url('${getImage(project, project.cover_image)}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }} id="projects" className="grid grid-cols-1 lg:grid-cols-1 h-[100vh] lg:h-[50vh] w-full">
        <GridBox variant="center" background='transparent' className="bg-black bg-opacity-50">
          <h1 className="font-extrabold text-[5rem] w-fit text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">MockUps &<br /> Interactive Prototype</h1>
        </GridBox>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <GridBox variant="no-padding" background="white">
          <div className="carousel rounded-none h-[50rem] relative w-full">
            {project.expand.high_fidelity_mock_ups.map((mockup, index) => {
              return (
                <div id={`mockups${index}`} key={mockup.id} className="carousel-item w-full h-full flex items-center justify-center relative">
                  <Mockup>
                    <Image fill style={{
                      objectFit: 'cover'
                    }} src={getImage(mockup, mockup.media!)} alt={"Mockups"} />
                  </Mockup>
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href={`#mockups${index - 1}`} className="btn btn-lg btn-ghost btn-circle">❮</a>
                    <a href={`#mockups${index + 1}`} className="btn btn-lg btn-ghost btn-circle">❯</a>
                  </div>
                </div>
              )
            })}
          </div>
        </GridBox>
        <GridBox variant="no-padding" background="gray">
          <div className="relative w-full">
            <FigmaPrototype url={project.expand.interactive_prototype.embed_src} />
          </div>
        </GridBox>
      </div>
    </div >
  )
}