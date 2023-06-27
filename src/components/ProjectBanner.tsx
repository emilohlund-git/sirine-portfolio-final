import Link from "next/link";
import { getImage } from "../utils/pb.utils";

type Props = {
  project: ProjectType;
  imageAlignment: 'left' | 'right';
  href: string;
}

const ProjectBanner: React.FC<Props> = ({ project, imageAlignment, href }) => {
  return (
    <div id="projects" className="grid grid-cols-1 lg:grid-cols-2 h-[100vh] lg:h-[50vh] w-full">
      <div style={{
        backgroundImage: `url('${getImage(project, project.cover_image)}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} className={`w-full h-full order-1 ${imageAlignment === 'left' ? 'lg:order-1' : 'lg:order-2'}`}>
      </div>
      <div className={`w-full h-full flex gap-y-4 justify-center px-20 lg:px-40 flex-col border-[1px] bg-gradient-to-tr from-base-300 via-base-100 to-base-200 border-gray-800 order-2 ${imageAlignment === 'left' ? 'lg:order-2' : 'lg:order-1'}`}>
        <h1 className="font-bold text-4xl w-fit text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">{project.title}</h1>
        <div className="font-normal truncate line-clamp-1 text-md text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400"
          dangerouslySetInnerHTML={{ __html: project.about }} />
        <span className="font-semibold pl-2 link link-secondary"><Link href={href}>&gt; Read more</Link></span>
      </div>
    </div>
  )
}

export default ProjectBanner