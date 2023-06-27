import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  cols: string | number;
}

const GridContainer: React.FC<Props> = ({ children, cols }) => {
  return (
    <div className={`grid grid-cols-1 min-h-max text-lg lg:h-[37rem] ${'lg:grid-cols-' + cols} w-full`}>
      {children}
    </div>
  )
}

export default GridContainer