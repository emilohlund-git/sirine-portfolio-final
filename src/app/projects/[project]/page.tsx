import pb from "@/utils/pb.config";
import { Metadata } from "next";
import Spinner from "../../../components/common/Spinner";
import GalleriesProject from "../../../components/project-views/GalleriesProject";
import GalleryProject from "../../../components/project-views/GalleryProject";
import ProcessesProject from "../../../components/project-views/ProcessesProject";
import ProjectPageBanner from "../../../components/project-views/ProjectPageBanner";

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
    ,navigation_map.media,galleries,research_image'
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
      <ProjectPageBanner project={project} />
      {project.gallery && project.gallery.length > 0
        ?
        <GalleryProject project={project} />
        :
        project.galleries.length > 0 ?
          <GalleriesProject project={project} />
          :
          <ProcessesProject project={project} />
      }
    </div >
  )
}
