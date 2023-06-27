'use client'

import React, { ReactNode } from 'react';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';

type Props = {
  children: ReactNode;
}

const Mockup: React.FC<Props> = ({ children }) => {
  return (
    <DeviceFrameset device="iPhone X" zoom={0.75} color="black">
      {children}
    </DeviceFrameset>
  )
}

export default Mockup