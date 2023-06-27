'use client'

import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

type Props = {
  isLoading: boolean;
}

const LogoutButton: React.FC<Props> = ({ isLoading }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSignout = async () => {
    setLoading(true);
    setLoading(false);
  }

  return (
    <button onClick={handleSignout} className="btn btn-secondary btn-outline rounded-none self-end" disabled={loading}>
      {loading ?
        <span className="loading loading-spinner"></span>
        : null}
      Logout <AiOutlineSend />
    </button>
  )
}

export default LogoutButton