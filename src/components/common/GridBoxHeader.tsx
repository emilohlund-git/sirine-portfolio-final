import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  color?: 'white' | 'gray' | 'gradient';
  size?: 'large' | 'default';
  className?: string;
}

const GridBoxHeader: React.FC<Props> = ({
  children,
  color = 'white',
  size = 'default',
  className
}) => {
  const getHeaderStyles = () => {
    let styles = '';
    if (color === 'gray') styles += 'from-gray-700 via-gray-800 to-gray-900 ';
    if (color === 'white') styles += 'from-white via-gray-200 to-gray-300 ';
    if (color === 'gradient') styles += 'from-pink-300 via-indigo-200 to-purple-200 ';
    if (size === 'large') styles += 'text-[3rem] lg:text-[5rem] ';
    if (size === 'default') styles += 'text-5xl ';
    return styles;
  }
  return (
    <h1 className={`font-extrabold relative w-fit text-transparent bg-clip-text bg-gradient-to-r mb-4 ${getHeaderStyles()} ${className}`}>{children}</h1>
  )
}

export default GridBoxHeader