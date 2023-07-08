'use client'

import { FormEvent, useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setSent } from '../../redux/features/email/emailSlice';

type Props = {}

const ContactForm = (props: Props) => {
  const dispatch = useDispatch();
  const closeModalRef = useRef<HTMLLabelElement>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/send-email', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        email,
        message
      })
    });
    setLoading(false);
    if (closeModalRef.current) {
      dispatch(setSent(true));
      closeModalRef.current.click();
    }
  }

  return (
    <>
      <form id="contactForm" onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" className="input input-ghost input-bordered input-secondary w-full rounded-none" required />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" className="textarea textarea-ghost textarea-bordered textarea-secondary w-full rounded-none" required />
      </form>
      <div className="modal-action">
        <label ref={closeModalRef} className="btn btn-outline rounded-none" htmlFor="contact_modal">close</label>
        <button form="contactForm" type="submit" className="btn btn-secondary btn-outline rounded-none" disabled={loading || !email || !message}>
          {loading ?
            <span className="loading loading-spinner"></span>
            : null}
          Send <AiOutlineSend />
        </button>
      </div>
    </>
  )
}

export default ContactForm