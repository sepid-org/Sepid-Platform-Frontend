import React, { useState } from 'react';
import { AppBar, Button, Container, Drawer, IconButton, Stack, Toolbar, Typography, styled, useMediaQuery } from '@mui/material';
import AccountBadge from '../atoms/buttons/AccountBadge';
import HomeIcon from '../atoms/icons/HomeIcon';
import MenuIcon from '@mui/icons-material/Menu'; // Menu icon for mobile drawer toggle
import useLocalNavigate from 'apps/film-bazi/hooks/useLocalNavigate';
import { useTheme } from '@mui/material/styles'; // To get theme breakpoints
import DashboardButton3 from '../atoms/buttons/DashboardButton3';
import HelpButton from '../atoms/buttons/HelpButton';
import HelpButton2 from '../atoms/buttons/HelpButton2';
import ProfileIcon from '../atoms/icons/Profile';
import useUserProfile from 'commons/hooks/useUserProfile';
import { SHAD_ORIGIN } from 'apps/film-bazi/constants/game';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: '0px 4px 4px 0px #00000040',
  border: '1px solid #4D4D4D',
  background: '#0D082A',
  width: '100%',
  height: theme.spacing(12),
  borderWidth: '2px 0px 0px 0px',
  opacity: 1,
  margin: '0 auto',
}));

const CustomToolbar = styled(Toolbar)({
  height: '100%',
  padding: 0,
  minHeight: 'unset',
});

const AppBarComponent = () => {
  const localNavigate = useLocalNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is mobile
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: userProfile } = useUserProfile();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const DrawerContent = (
    <Stack spacing={2} padding={2}>
      <Button startIcon={<HomeIcon />} onClick={() => localNavigate('/')}>
        <Typography fontWeight={700} fontSize={18}>
          {'خانه'}
        </Typography>
      </Button>
      {userProfile.origin !== SHAD_ORIGIN &&
        <Button startIcon={<ProfileIcon />} onClick={() => localNavigate('/profile/')}>
          <Typography fontWeight={700} fontSize={18}>
            {'نمایه'}
          </Typography>
        </Button>
      }
      <HelpButton2 />
    </Stack>
  );

  return (
    <CustomAppBar position='fixed' sx={{ borderRadius: 0 }}>
      <CustomToolbar>
        <Container maxWidth="lg">
          <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
            <Stack direction={'row'}>
              <AccountBadge />
            </Stack>
            {isMobile ? (
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            ) : (
              <Stack direction={'row-reverse'} spacing={2}>
                {userProfile.origin !== SHAD_ORIGIN &&
                  <DashboardButton3 label='نمایه' icon={<ProfileIcon />} onClick={() => { localNavigate(`/profile/`) }} />
                }
                <HelpButton />
                <DashboardButton3 label='خانه' icon={<HomeIcon />} onClick={() => { localNavigate(`/`) }} />
              </Stack>
            )}
          </Stack>
        </Container>
      </CustomToolbar>

      <Drawer disableScrollLock anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} PaperProps={{ sx: { borderRadius: '0px !important' } }}>
        {DrawerContent}
      </Drawer>
    </CustomAppBar>
  );
};

export default AppBarComponent;
