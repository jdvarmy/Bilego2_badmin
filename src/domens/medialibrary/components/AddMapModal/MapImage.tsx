import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, CardHeader, CardMedia, IconButton, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { Dispatch, SetStateAction } from 'react';

import { HTTP_URL } from '../../../../typings/env';
import { MapFile } from '../../../../typings/types';

const MapCard = styled(Card)(
  ({ theme, color }) => `
  & {
    display: inline-block;
    margin: ${theme.spacing(1)};
    width: 296px;
    cursor: pointer;
    box-shadow: none;
    border-width: 2px;
    border-style: solid;
    border-color: ${color};
    transition: ${theme.transitions.create(['border'])};
    &:hover {
      border-color: ${color !== theme.colors.secondary.lighter ? color : theme.colors.primary.main};
    }
    &.selected {
      border-color: ${theme.colors.success.main};
    }
  }
`,
);

type Props = {
  item: MapFile;
  onClick: Dispatch<SetStateAction<string | null>>;
  selected: boolean;
};

const MapImage = ({ item: { uid, map }, selected, onClick }: Props) => {
  const theme = useTheme();
  const title = map?.name || map?.originalName;

  const handleClick = () => {
    onClick((prev) => {
      if (prev === uid) {
        return null;
      }
      return uid;
    });
  };

  if (!map) {
    return null;
  }

  return (
    <MapCard onClick={handleClick} color={selected ? theme.colors.success.main : theme.colors.secondary.lighter}>
      <CardHeader
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
      />
      <CardMedia sx={{ height: 140 }} image={`${HTTP_URL}${map.path}`} title={title} />
    </MapCard>
  );
};

export default MapImage;
