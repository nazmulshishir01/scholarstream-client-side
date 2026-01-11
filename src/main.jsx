import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import router from './routes/router';
import AuthProvider from './providers/AuthProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'var(--fallback-b1,oklch(var(--b1)))',
                  color: 'var(--fallback-bc,oklch(var(--bc)))',
                  border: '1px solid var(--fallback-b3,oklch(var(--b3)))'
                }
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
