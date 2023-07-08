import React from 'react'
import { PiCaretDoubleLeftLight, PiCaretDoubleRightLight } from 'react-icons/pi'

type DotButtonPropType = {
  selected: boolean
  onClick: () => void
}

export const DotButton: React.FC<DotButtonPropType> = (props) => {
  const { selected, onClick } = props

  return (
    <button
      className={'embla__dot'.concat(selected ? ' embla__dot--selected' : '')}
      type="button"
      onClick={onClick}
    />
  )
}

type PrevNextButtonPropType = {
  enabled: boolean
  onClick: () => void
}

export const PrevButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props

  return (
    <button
      className="z-[999] btn rounded-none absolute bottom-0 left-0"
      onClick={onClick}
      disabled={!enabled}
    >
      <PiCaretDoubleLeftLight />
    </button>
  )
}

export const NextButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props

  return (
    <button
      className="z-[999] btn rounded-none absolute bottom-0 right-0"
      onClick={onClick}
      disabled={!enabled}
    >
      <PiCaretDoubleRightLight />
    </button>
  )
}
