import { ReactNode } from 'react';
import Spotlight, { SpotlightCard } from './SpotlightCard';

type Props = {
  children: ReactNode;
  background: 'gray' | 'white' | 'transparent';
  variant?: 'center' | 'default' | 'no-padding';
  position?: 'end' | 'start';
  className?: string;
  spotlight?: boolean;
}

const GridBox: React.FC<Props> = ({ children, background = 'transparent', variant = 'default', position = 'start', className, spotlight = false }) => {
  const getBackgroundColor = () => {
    switch (background) {
      case 'gray': return 'bg-gradient-to-tr from-base-200 via-base-100 to-base-300';
      case 'white': return 'bg-[#fdfdfd]';
      case 'transparent': return '';
    }
  }

  const getVariantStyles = () => {
    if (variant === 'center' && position === 'start') return 'items-start justify-center';
    if (variant === 'center' && position === 'end') return 'items-center justify-center';
    if (variant === 'default') return '';
  }

  return (
    <>
      {spotlight ?
        <Spotlight>
          <SpotlightCard>
            <div className={`relative overflow-hidden border-[1px] border-gray-900 w-full h-full flex gap-y-8 ${variant === 'no-padding' ? '' : 'py-20 px-10 lg:px-40'} flex-col ${getBackgroundColor()} ${getVariantStyles()} ${className}`}>
              {children}
            </div>
          </SpotlightCard>
        </Spotlight>
        :
        <div className={`relative overflow-hidden border-[1px] border-gray-900 w-full h-full flex gap-y-8 ${variant === 'no-padding' ? '' : 'py-20 px-10 lg:px-40'} flex-col ${getBackgroundColor()} ${getVariantStyles()} ${className}`}>
          {children}
        </div>
      }
    </>
  )
}

export default GridBox