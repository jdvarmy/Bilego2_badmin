import ExpandLessTwoToneIcon from '@mui/icons-material/ExpandLessTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { Badge, Button, Collapse, ListItem } from '@mui/material';
import clsx from 'clsx';
import React, { FC, ReactNode, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { sidebarActions } from '../../store/sidebarSlice';

interface SidebarMenuItemProps {
  name: string;
  link: string;
  icon: any;
  badge?: string;
  open?: boolean;
  active?: boolean;
  children?: ReactNode;
}

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
  children,
  link,
  icon: Icon,
  badge,
  open: openParent,
  active,
  name,
  ...rest
}) => {
  const actions = useActionCreators(sidebarActions);
  const [menuToggle, setMenuToggle] = useState<boolean>(openParent || false);

  const handleClick = () => {
    actions.toggleSidebar();
  };

  const toggleMenu = (): void => {
    setMenuToggle((Open) => !Open);
  };

  if (children) {
    return (
      <ListItem component='div' className='Mui-children' key={name} {...rest}>
        <Button
          className={clsx({ 'Mui-active': active })}
          startIcon={Icon && <Icon />}
          endIcon={menuToggle ? <ExpandLessTwoToneIcon /> : <ExpandMoreTwoToneIcon />}
          onClick={toggleMenu}
        >
          {name}
        </Button>
        <Collapse in={menuToggle}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem component='div' key={name} {...rest}>
      <Button
        className={clsx({ 'Mui-active': active })}
        component={RouterLink}
        onClick={handleClick}
        to={link}
        startIcon={Icon && <Icon />}
      >
        {name}
        {badge && <Badge badgeContent={badge} />}
      </Button>
    </ListItem>
  );
};

export default SidebarMenuItem;
