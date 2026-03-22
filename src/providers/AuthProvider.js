'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hydrate } from '@/redux/slices/authSlice';

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrate());
  }, [dispatch]);

  return <>{children}</>;
}
