import {
  createStyles,
  Header as MantineHeader,
  Group,
  Button,
  Box,
  rem,
  Autocomplete,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { OrganisationLogo } from './OrganisationLogo';

const HEADER_HEIGHT = rem(84);

const useStyles = createStyles((theme) => ({
  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  header: {
    // backgroundColor: theme.colors.gray[2],
  },
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function Header() {
  const { classes } = useStyles();

  return (
    <Box pb={100}>
      <MantineHeader px='md' height={HEADER_HEIGHT} className={classes.header}>
        <Group position='apart' sx={{ height: '100%' }}>
          <OrganisationLogo />

          <Group className={classes.hiddenMobile}>
            <Autocomplete
              className={classes.search}
              placeholder='Search'
              icon={<IconSearch size='1rem' stroke={1.5} />}
              data={[
                'React',
                'Angular',
                'Vue',
                'Next.js',
                'Riot.js',
                'Svelte',
                'Blitz.js',
              ]}
            />
          </Group>

          <Group className={classes.hiddenMobile}>
            <Button variant='default'>Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </Group>
      </MantineHeader>
    </Box>
  );
}
