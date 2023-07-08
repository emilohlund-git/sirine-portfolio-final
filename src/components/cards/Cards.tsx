'use client'

import BrandingIcon from '../icons/BrandingIcon'
import DesignIcon from '../icons/DesignIcon'
import ProductDesign from '../icons/ProductDesignIcon'
import { Card } from './Card'

type Props = {}

const Cards = (props: Props) => {
  return (
    <div className="p-4 lg:p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 place-items-center gap-4 w-full">
      <Card text='UI/UX'>
        <div className="flex flex-col self-end gap-y-4 max-w-[80%]">
          <DesignIcon />
          <h4 className="font-medium text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-900">UI/UX</h4>
          <p className="text-transparent text-md bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Designing user friendly, efficiency, and enjoyable interfaces.</p>
        </div>
      </Card>
      <Card text='Design & Creative'>
        <div className="flex flex-col self-end gap-y-4 max-w-[80%]">
          <BrandingIcon />
          <h4 className="font-medium text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-900">Branding</h4>
          <p className="text-transparent text-md bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Creating impactful brand identities that inspire trust and resonate with audiences.</p>
        </div>
      </Card>
      <Card text='Product Design'>
        <div className="flex flex-col self-end gap-y-4 max-w-[80%]">
          <ProductDesign />
          <h4 className="font-medium text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-900">Product Design</h4>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Crafting user-centered products that seamlessly blend form and function.</p>
        </div>
      </Card>
    </div>
  )
}

export default Cards