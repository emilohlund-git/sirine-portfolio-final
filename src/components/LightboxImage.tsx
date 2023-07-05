'use client'

import React, { ReactNode } from 'react';
import { SRLWrapper } from 'simple-react-lightbox';

type Props = {
  className?: string;
  children?: ReactNode;
}

const LightboxImage: React.FC<Props> = ({ children }) => {
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
      },
    }}>
      {children}
    </SRLWrapper>
  )
}

export default LightboxImage