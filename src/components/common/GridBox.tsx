import { CSSProperties, ReactNode } from 'react';
import Spotlight, { SpotlightCard } from '../cards/SpotlightCard';

type Props = {
  children: ReactNode;
  background: 'gray' | 'white' | 'transparent';
  variant?: 'center' | 'default' | 'no-padding';
  position?: 'end' | 'start';
  className?: string;
  spotlight?: boolean;
  style?: CSSProperties;
}

const GridBox: React.FC<Props> = ({ children, background = 'transparent', variant = 'default', position = 'start', className, spotlight = false, style }) => {
  const getBackgroundColor = () => {
    switch (background) {
      case 'gray': return 'bg-gradient-to-tr from-base-200 via-base-100 to-base-300';
      case 'white': return 'bg-[#fdfdfd]';
      case 'transparent': return '';
      default: return '';
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
            <div style={style} className={`relative overflow-hidden border-[1px] border-gray-900 w-full h-full flex ${variant === 'no-padding' ? '' : 'py-20 px-10 lg:px-40'} flex-col ${getBackgroundColor()} ${getVariantStyles()} ${className}`}>
              {children}
            </div>
          </SpotlightCard>
        </Spotlight>
        :
        <div style={style} className={`relative overflow-hidden border-[1px] border-gray-900 w-full h-full flex ${variant === 'no-padding' ? '' : 'py-20 px-10 lg:px-40'} flex-col ${getBackgroundColor()} ${getVariantStyles()} ${className}`}>
          {children}
        </div>
      }
    </>
  )
}

export default GridBox