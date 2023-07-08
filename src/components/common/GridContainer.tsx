import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  cols?: string | number;
  className?: string;
}

const GridContainer: React.FC<Props> = ({ children, cols, className }) => {
  return (
    <div className={`flex flex-col lg:grid min-h-max text-lg h-full ${'lg:grid-cols-' + cols} w-full ${className}`}>
      {children}
    </div>
  )
}

export default GridContainer