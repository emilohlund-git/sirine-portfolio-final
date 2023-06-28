import Image from "next/image";
import { getImage } from "../utils/pb.utils";

type Props = {
  media: ProjectMedia;
  url: string;
  alt: string;
  className?: string;
}

const ResponsiveImage: React.FC<Props> = ({ media, url, alt, className }) => {
  return (
    <Image
      className={className} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      fill
      style={{
        objectFit: 'contain'
      }}
      src={getImage(media, url)}
      alt={alt}
    />
  )
}

export default ResponsiveImage