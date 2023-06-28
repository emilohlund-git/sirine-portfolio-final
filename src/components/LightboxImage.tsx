'use client'

import React from 'react';
import { SRLWrapper } from 'simple-react-lightbox';
import ResponsiveImage from './ResponsiveImage';

type Props = {
  media: ProjectMedia;
  url: string;
  alt: string;
  className?: string;
}

const LightboxImage: React.FC<Props> = ({ media, url, alt, className }) => {
  return (
    <SRLWrapper options={{
      settings: {
        hideControlsAfter: true,
        disableKeyboardControls: true,
        disableWheelControls: true,
        overlayColor: '#fff'
      },
      buttons: {
        showNextButton: false,
        showPrevButton: false,
        showAutoplayButton: false
      },
      thumbnails: {
        showThumbnails: false,
      }
    }}>
      <div className="cursor-zoom-in">
        <ResponsiveImage media={media} url={url} alt={alt} className={className} />
      </div>
    </SRLWrapper>
  )
}

export default LightboxImage