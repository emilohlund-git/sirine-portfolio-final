import pb from "@/utils/pb.config";
import { Metadata } from "next";
import Link from "next/link";
import GridBox from "../../../components/GridBox";
import ProcessesProject from "../../../components/ProcessesProject";
import Spinner from "../../../components/Spinner";
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
    expand: 'affinity_map,brand_colors,colors,findings\
    ,font_family,high_fidelity_mock_ups,iconography\
    ,interactive_prototype,logo,navigation_map,persona\
    ,primary_research,secondary_research,user_flow\
    ,user_scenario,primary_research.media,secondary_research\
    .media,logo.media,brand_colors.media,iconography.media\
    ,persona.media,affinity_map.media,user_flow.media\
    ,navigation_map.media'
  }) as ProjectType;

  if (!res) {
    throw new Error(`Failed to fetch project: ${projectId}`);
  }

  return res;
}

export default async function Page({ params }: { params: { project: string } }) {
  const project = await getProject(params.project);

  if (!project) return <Spinner />

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
      <ProcessesProject project={project} />
    </div >
  )
}
