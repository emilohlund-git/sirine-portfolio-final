'use client'

import Image from "next/image";
import { useState } from "react";
import { getImage } from "../utils/pb.utils";
import Spinner from "./Spinner";

type Props = {
  media: ProjectMedia;
  url: string;
  alt: string;
  className?: string;
}

const ResponsiveImage: React.FC<Props> = ({ media, url, alt, className }) => {
  const [isImageReady, setIsImageReady] = useState(false);

  const onLoadCallBack = (e: any) => {
    setIsImageReady(true)
    /* @ts-ignore */
    typeof onLoad === "function" && onLoad(e)
  }

  return (
    <>
      {!isImageReady && <Spinner />}
      <Image
        className={className} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onLoadingComplete={onLoadCallBack}
        fill
        style={{
          objectFit: 'contain'
        }}
        src={getImage(media, url)}
        alt={alt}
      />
    </>
  )
}

export default ResponsiveImage