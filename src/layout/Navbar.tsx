import { Navbar as MantineNavbar, Header } from '@mantine/core';

export const Navbar = () => {
  return (
    <MantineNavbar width={{ base: 300 }} height={500} p='xs' bg='indigo'>
      <MantineNavbar.Section mt='xs'>
        <div>Logo</div>
      </MantineNavbar.Section>
      <MantineNavbar.Section grow mt='md'>
        {/* <MainLinks /> */}
      </MantineNavbar.Section>
      <MantineNavbar.Section>{/* <User />s */}</MantineNavbar.Section>
    </MantineNavbar>
  );
};
