import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
} from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

import App from './App';
import './styles.css';
import { AppShell } from './layout';
import ErrorBoundray from './common/error/ErrorBoundray';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundray>
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
    </ErrorBoundray>
  </React.StrictMode>
);
