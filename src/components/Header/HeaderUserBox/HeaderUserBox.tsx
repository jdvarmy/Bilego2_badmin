import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
  lighten,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginPage } from 'src/typings/types';

import { selectAuthUser } from '../../../domens/auth/store/authSelector';
import { logout } from '../../../domens/auth/store/authThunk';
import { useAppDispatch, useStateSelector } from '../../../store/store';
import { UserRole } from '../../../typings/enum';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
    padding-left: ${theme.spacing(1)};
    padding-right: ${theme.spacing(1)};
`,
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(2)};
`,
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
    text-align: left;
    padding-left: ${theme.spacing(1)};
`,
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.palette.secondary.main};
    display: block;
`,
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
    color: ${lighten(theme.palette.secondary.main, 0.5)}
`,
);

const roleMap = {
  [UserRole.admin]: 'Администратор',
  [UserRole.manager]: 'Менеджер сайта',
};

function HeaderUserBox() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useStateSelector(selectAuthUser);
  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate(loginPage);
      });
  };

  return (
    <>
      <UserBoxButton color='secondary' ref={ref} onClick={handleOpen}>
        <Avatar variant='rounded' alt={user?.name} src='/static/images/avatars/1.jpg' />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant='body1'>
              {user?.name} {user?.surname}
            </UserBoxLabel>
            <UserBoxDescription variant='body2'>
              {!!user?.role && roleMap[user.role as keyof typeof roleMap]}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display='flex'>
          <Avatar variant='rounded' alt={user?.name} src='/static/images/avatars/1.jpg' />
          <UserBoxText>
            <UserBoxLabel variant='body1'>
              {user?.name} {user?.surname}
            </UserBoxLabel>
            <UserBoxDescription variant='body2'>
              {!!user?.role && roleMap[user.role as keyof typeof roleMap]}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component='nav'>
          <ListItem button to='/management/profile/details' component={NavLink}>
            <AccountBoxTwoToneIcon fontSize='small' />
            <ListItemText primary='My Profile' />
          </ListItem>
          <ListItem button to='/dashboards/messenger' component={NavLink}>
            <InboxTwoToneIcon fontSize='small' />
            <ListItemText primary='Messenger' />
          </ListItem>
          <ListItem button to='/management/profile/settings' component={NavLink}>
            <AccountTreeTwoToneIcon fontSize='small' />
            <ListItemText primary='Account Settings' />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color='primary' fullWidth onClick={handleLogout}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserBox;
