import {
  Box,
  Group,
  Navbar as MantineNavbar,
  ThemeIcon,
  UnstyledButton,
  createStyles,
  Text,
} from '@mantine/core';
import {
  IconBuildingStore,
  IconChevronsLeft,
  IconHome2,
  IconLogout,
  IconPackage,
  IconSoup,
  IconUsers,
} from '@tabler/icons-react';

interface MainLinkProps {
  icon: React.ReactNode;
  color?: string;
  label: string;
}

const useStyles = createStyles((theme) => ({
  navbar: {
    height: '100%',
    // backgroundColor: theme.colors.gray[5],
  },
}));

const MenuLinkConfig = [
  { link: '', label: 'Home', icon: <IconHome2 /> },
  { link: '', label: 'Orders', icon: <IconPackage /> },
  { link: '', label: 'Users', icon: <IconUsers /> },
  { link: '', label: 'Products', icon: <IconSoup /> },
  { link: '', label: 'Stores', icon: <IconBuildingStore /> },
  { link: '', label: 'Logout', icon: <IconLogout /> },
];

function MenuLink({ icon, color, label }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant='light'>
          {icon}
        </ThemeIcon>

        <Text size='sm'>{label}</Text>
      </Group>
    </UnstyledButton>
  );
}
export function MenuLinks() {
  const links = MenuLinkConfig.map((link) => (
    <MenuLink {...link} key={link.label} />
  ));
  return <div>{links}</div>;
}

export const Navbar = () => {
  const { classes } = useStyles();

  return (
    <MantineNavbar width={{ base: 300 }} p='xs' className={classes.navbar}>
      <MantineNavbar.Section mt='xs'>
        <Box>
          <IconChevronsLeft />
        </Box>
      </MantineNavbar.Section>
      <MantineNavbar.Section grow mt='md'>
        <MenuLinks />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
