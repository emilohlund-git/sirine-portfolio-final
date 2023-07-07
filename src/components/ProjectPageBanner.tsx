import Link from 'next/link'
import React from 'react'
import { getImage } from '../utils/pb.utils'
import GridBox from './GridBox'

type Props = {
  project: ProjectType;
}

const ProjectPageBanner: React.FC<Props> = ({
  project
}) => {
  return (
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
  )
}

export default ProjectPageBanner