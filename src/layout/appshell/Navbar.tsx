import React from "react";

import {
  Box,
  Group,
  Navbar as MantineNavbar,
  ThemeIcon,
  UnstyledButton,
  createStyles,
  Text,
  rem,
  Tooltip,
} from "@mantine/core";
import {
  IconBuildingStore,
  IconChevronsLeft as MinimizeNavbarIcon,
  IconHome2,
  IconLogout,
  IconPackage,
  IconSoup,
  IconUsers,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

import { RouteList } from "@common/route";

interface MainLinkProps {
  icon: React.ReactNode;
  color?: string;
  label: string;
  linkTo: RouteList;
  // isClickedMinimizeNavbarIcon?: boolean;
}

const useStyles = createStyles((theme) => ({
  navbar: {
    height: rem("100%"),
  },
  minimizeIconContainer: {
    width: rem("30%"),
    marginLeft: rem("70%"),
    display: theme.breakpoints.sm ? "none" : "flex",
    justifyContent: "flex-end",
  },
}));

const MenuLinkConfig = [
  { linkTo: RouteList.DASHBOARD, label: "Dashboard", icon: <IconHome2 /> },
  { linkTo: RouteList.ORDERS, label: "Orders", icon: <IconPackage /> },
  { linkTo: RouteList.USERS, label: "Users", icon: <IconUsers /> },
  { linkTo: RouteList.PRODUCTS, label: "Products", icon: <IconSoup /> },
  { linkTo: RouteList.STORES, label: "Stores", icon: <IconBuildingStore /> },
  { linkTo: RouteList.LOGOUT, label: "Logout", icon: <IconLogout /> },
];

function MenuLink({
  icon,
  color,
  label,
  linkTo,
}: // isClickedMinimizeNavbarIcon,
MainLinkProps) {
  return (
    <NavLink to={linkTo}>
      <Tooltip label={label}>
        <UnstyledButton
          sx={(theme) => ({
            display: "block",
            width: rem("100%"),
            paddingLeft: theme.breakpoints.sm ? "0.5px" : theme.spacing.xs,
            paddingRight: theme.breakpoints.sm ? "0.5px" : theme.spacing.xs,
            paddingBottom: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
            minHeight: rem(50),
          })}
        >
          <Group>
            <ThemeIcon color={color} variant="light">
              {icon}
            </ThemeIcon>
            <Text display={{ base: "none", md: "block" }}>{label}</Text>
          </Group>
        </UnstyledButton>
      </Tooltip>
    </NavLink>
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

  // TODO : Hide Navbar menu
  // const [isClickedMinimizeNavbarIcon, setIsClickedMinimizeNavbarIcon] =
  //   useState(false);

  return (
    <MantineNavbar
      width={{ base: 60, md: 300 }}
      p="xs"
      className={classes.navbar}
    >
      <MantineNavbar.Section mt="xs">
        <Box
          className={classes.minimizeIconContainer}

          // onClick={() =>
          //   setIsClickedMinimizeNavbarIcon((prevState) => !prevState)
          // }
        >
          <MinimizeNavbarIcon />
        </Box>
      </MantineNavbar.Section>
      <MantineNavbar.Section grow mt="md">
        <MenuLinks />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
