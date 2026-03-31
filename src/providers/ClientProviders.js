'use client';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import QueryProvider from '@/providers/QueryProvider';
import AuthProvider from '@/providers/AuthProvider';
import Navbar from '@/components/Navbar';
import { Toaster } from 'sonner';

export default function ClientProviders({ children }) {
  return (
    <>
      <Toaster richColors position="top-right" theme="dark" />
      <Provider store={store}>
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
          </AuthProvider>
        </QueryProvider>
      </Provider>
    </>
  );
}
