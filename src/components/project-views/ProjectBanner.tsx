import Image from "next/image";
import Link from "next/link";
import { truncate } from "../../utils/general.utils";
import { getImage, getImageThumb } from "../../utils/pb.utils";
import { LazyLoadImage } from "../common/LazyLoadImage";

type Props = {
  project: ProjectType;
  imageAlignment: 'left' | 'right';
  href: string;
}

const ProjectBanner: React.FC<Props> = ({ project, imageAlignment, href }) => {
  return (
    <div id="projects" className="grid grid-cols-1 lg:grid-cols-2 h-full w-full">
      <div className={`w-full h-[50vh] lg:h-full order-1 ${imageAlignment === 'left' ? 'lg:order-1' : 'lg:order-2'}`}>
        <LazyLoadImage
          fill
          priority
          style={{
            objectFit: 'cover'
          }}
          src={getImage(project, project.cover_image)}
          alt={project.title}
          className="h-[50vh] lg:h-full"
        />
      </div>
      <div className={`w-full py-32 h-full flex gap-y-4 justify-center px-10 lg:px-40 flex-col border-[1px] bg-gradient-to-tr from-base-300 via-base-100 to-base-200 border-gray-800 order-2 ${imageAlignment === 'left' ? 'lg:order-2' : 'lg:order-1'}`}>
        <h1 className="font-bold text-4xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400 flex items-center gap-x-3">
          {project.expand.logo?.expand.media &&
            <Image
              width={30}
              height={30}
              src={getImageThumb(project.expand.logo.expand.media[0], project.expand.logo.expand.media[0].media!)}
              alt={project.title}
            />
          }
          {project.title}
        </h1>
        <div className="font-normal text-md w-full text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400"
          dangerouslySetInnerHTML={{ __html: truncate(project.about, 120) }} />
        <div className="flex flex-wrap gap-2">
          {project.tools.map((tool, index) => {
            return (
              <div key={tool + index} className="badge badge-outline" style={{
                color: project.expand.colors.project_theme_color
              }}>{tool}</div>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-2">
          {project.roles.map((role, index) => {
            return (
              <div key={role + index} className="badge badge-outline" style={{
                color: project.expand.colors.project_theme_color
              }}>{role}</div>
            )
          })}
        </div>
        <Link href={href} className={`btn btn-square btn-md bg-black bg-opacity-30 w-fit font-semibold px-4`} style={{
          color: project.expand.colors.project_theme_color,
        }}>&gt; View Project</Link>
      </div>
    </div>
  )
}

export default ProjectBanner