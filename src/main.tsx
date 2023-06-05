import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import App from './App';
import './styles.css';
import { AppShell } from '@layout/appshell';
import { ErrorBoundray } from '@common/components/error';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundray>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MantineProvider
            theme={{ colorScheme: 'light' }}
            withGlobalStyles
            withNormalizeCSS
          >
            <AppShell>
              <App />
            </AppShell>
          </MantineProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundray>
  </React.StrictMode>
);
