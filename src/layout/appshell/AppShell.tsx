import { AppShell as MantineAppShell } from '@mantine/core';
import { ReactNode } from 'react';

import { Navbar } from '@layout/appshell/Navbar';
import { Header } from '@layout/appshell/Header';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <MantineAppShell
      padding='sm'
      navbar={<Navbar />}
      header={<Header />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </MantineAppShell>
  );
}
