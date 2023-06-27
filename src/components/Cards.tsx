'use client'

import { Card } from './Card'
import ProductDesign from './ProductDesign'
import BrandingIcon from './icons/BrandingIcon'
import DesignIcon from './icons/DesignIcon'

type Props = {}

const Cards = (props: Props) => {
  return (
    <div className="p-4 lg:p-4 grid grid-cols-1 lg:grid-cols-3 place-items-center gap-4">
      <Card text='UI/UX'>
        <div className="flex flex-col self-end gap-y-4 max-w-[80%]">
          <DesignIcon />
          <h4 className="font-medium text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-900">UI/UX</h4>
          <p className="text-transparent text-md bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Designing interfaces that are intuitive, efficient, and enjoyable to use.</p>
        </div>
      </Card>
      <Card text='Design & Creative'>
        <div className="flex flex-col self-end gap-y-4 max-w-[80%]">
          <BrandingIcon />
          <h4 className="font-medium text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-900">Branding</h4>
          <p className="text-transparent text-md bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Designing interfaces that are intuitive, efficient, and enjoyable to use.</p>
        </div>
      </Card>
      <Card text='Product Design'>
        <div className="flex flex-col self-end gap-y-4 max-w-[80%]">
          <ProductDesign />
          <h4 className="font-medium text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-900">Product Design</h4>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-400">Designing interfaces that are intuitive, efficient, and enjoyable to use.</p>
        </div>
      </Card>
    </div>
  )
}

export default Cards