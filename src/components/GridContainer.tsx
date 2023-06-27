import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  cols: string | number;
  className?: string;
}

const GridContainer: React.FC<Props> = ({ children, cols, className }) => {
  return (
    <div className={`grid grid-cols-1 min-h-max text-lg lg:h-[37rem] ${'lg:grid-cols-' + cols} w-full ${className}`}>
      {children}
    </div>
  )
}

export default GridContainer