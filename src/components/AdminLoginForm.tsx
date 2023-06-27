'use client';

import { FormEvent, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

type Props = {}

const AdminLoginForm = (props: Props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState<{
    code: string;
    message: string;
  } | undefined>();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoading(false);
  };

  return (
    <>
      <form className="flex flex-col w-[25rem]" onSubmit={handleSubmit}>
        <h3 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white w-fit mb-4 to-gray-400">Admin Sigin</h3>
        {error ?
          <div className="alert rounded-none alert-outline alert-error mb-6">
            <svg onClick={() => setError(undefined)} xmlns="http://www.w3.org/2000/svg" className="stroke-current cursor-pointer shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error?.message}</span>
          </div>
          : null}
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email" className="input input-ghost input-bordered input-secondary w-full rounded-none" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Your password" className="input input-ghost input-bordered input-secondary w-full rounded-none" required />
        <button type="submit" className="btn btn-secondary btn-outline rounded-none self-end" disabled={loading || !email || !password}>
          {loading ?
            <span className="loading loading-spinner"></span>
            : null}
          Login <AiOutlineSend />
        </button>
      </form>
    </>
  )
}

export default AdminLoginForm