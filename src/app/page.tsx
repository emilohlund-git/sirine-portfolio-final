import Image from "next/image";
import Link from "next/link";
import { AiOutlineLinkedin, AiOutlineProject } from 'react-icons/ai';
import Cards from "../components/Cards";
import Contact from "../components/Contact";
import Divider from "../components/Divider";
import FadeIn from "../components/FadeIn";
import GradientButton from "../components/GradientButton";
import ProjectBanner from "../components/ProjectBanner";
import Spotlight, { SpotlightCard } from "../components/SpotlightCard";
import pb from "../utils/pb.config";

export const revalidate = 60

export default async function Home() {
  const projects = await pb.collection('projects').getFullList({
    expand: 'affinity_map,brand_colors,colors,findings,font_family,high_fidelity_mock_ups,iconography,interactive_prototype,logo,navigation_map,persona,primary_research,secondary_research,user_flow,user_scenario'
  }) as ProjectType[];

  return (
    <div className="flex flex-col items-center">
      <FadeIn>
        <div className="h-[80vh] flex flex-col items-center justify-center">
          <div className="text-center flex flex-col justify-center items-center text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500 z-20">
            <div className="relative">
              <Image src='/sirine.jpg' height={100} width={100} alt="Sirine" className="rounded-full mb-8 border-gray-600 border-[2px] shadow-lg" />
            </div>
            <h1 className="font-extrabold text-4xl">Sirine <span className="font-light">Harzallah</span></h1>
            <h3 className="font-extrabold text-2xl">UI/UX <span className="font-light">Designer</span></h3>
          </div>
          <GradientButton href="#projects" className="mt-12">
            Projects <AiOutlineProject />
          </GradientButton>
        </div>
      </FadeIn>
      <div className="lg:px-60 w-full">
        <Cards />
      </div>
      <Divider />
      {projects && projects.length > 0 && projects.map((project, index) => {
        return (
          <FadeIn key={project.id}>
            <Spotlight>
              <SpotlightCard>
                <ProjectBanner project={project} imageAlignment={index % 2 === 0 ? 'left' : 'right'} href={`/projects/${project.id}`} />
              </SpotlightCard>
            </Spotlight>
          </FadeIn>
        )
      })}
      <Divider />
      <FadeIn>
        <Contact />
      </FadeIn>
      <Divider />
      <div className="flex flex-col lg:flex-row text-center lg:justify-between w-full lg:px-60 text-sm mb-20">
        <p>© Sirine Harzzalah {new Date().getFullYear()}</p>
        <p><Link className="flex gap-x-1 items-center" target="_blank" referrerPolicy="no-referrer" href="https://linked.in/sirine-harzallah"><AiOutlineLinkedin /> LinkedIn</Link></p>
      </div>
    </div >
  )
}
