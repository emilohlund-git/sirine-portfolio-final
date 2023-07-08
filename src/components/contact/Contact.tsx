'use client'

import { AiOutlineMail } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import GradientButton from '../common/GradientButton';

type Props = {}

const Contact = (props: Props) => {
  const sent = useSelector((state: RootState) => state.emailSent.value);

  return (
    <div className="flex flex-col items-center text-center lg:text-left">
      {sent ?
        <h1 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Thank you for your email!</h1>
        :
        <>
          <h1 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Ready to embark on your project journey?</h1>
          <label htmlFor="contact_modal" >
            <GradientButton ariaLabel='Get in Touch' role="button" className="mt-12">
              Get in Touch <AiOutlineMail />
            </GradientButton>
          </label>
        </>
      }
    </div>
  )
}

export default Contact