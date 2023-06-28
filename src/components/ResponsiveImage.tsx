'use client'

import Image from "next/image";
import { getImage } from "../utils/pb.utils";

type Props = {
  media: ProjectMedia;
  url: string;
  alt: string;
  className?: string;
}

const ResponsiveImage: React.FC<Props> = ({ media, url, alt, className }) => {
  const imageSrc = getImage(media, url);

  return (
    <Image
      fill
      className={className}
      style={{
        objectFit: 'contain'
      }}
      loading={'eager'}
      src={imageSrc}
      alt={alt}
    />
  )
}

export default ResponsiveImage