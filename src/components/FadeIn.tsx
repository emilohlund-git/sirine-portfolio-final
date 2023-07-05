'use client';

import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

const FadeIn: React.FC<Props> = ({ children }) => {
  return (
    <motion.div
      className="w-full h-full"
      initial={{
        y: 20,
        opacity: 0
      }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: .5
      }}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn