import Image from "next/image";

type Props = {
  url: string;
  alt: string;
  className?: string;
}

const ResponsiveImage: React.FC<Props> = ({ url, alt, className }) => {
  return (
    <Image
      fill
      className={className}
      style={{
        objectFit: 'contain'
      }}
      unoptimized={true}
      src={url}
      alt={alt}
    />
  )
}

export default ResponsiveImage