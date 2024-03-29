import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: calc(100% - 32px);
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`,
);

function HeaderMenu() {
  return (
    <>
      <ListWrapper>
        <List disablePadding component={Box} display='flex'>
          <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to='/tickets'>
            <ListItemText primaryTypographyProps={{ noWrap: true }} primary='Билеты' />
          </ListItem>
          <ListItem classes={{ root: 'MuiListItem-indicators' }} button component={NavLink} to='/orders'>
            <ListItemText primaryTypographyProps={{ noWrap: true }} primary='Заказы' />
          </ListItem>
        </List>
      </ListWrapper>
    </>
  );
}

export default HeaderMenu;
