import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';
import { Grid, Tooltip } from '@mui/material';
import React, { memo } from 'react';

import dateTimeFormatDefault from '../../../../utils/helpers/dateTimeFormatDefault';
import { useStateSelector } from '../../../store';
import { selectEventState } from '../../store/eventsSelectors';

const formatter = new Intl.DateTimeFormat('ru', dateTimeFormatDefault);

export const CardHeaderAvatar = memo(function CardHeaderAvatar() {
  const create = useStateSelector((state) => selectEventState(state).create);
  const update = useStateSelector((state) => selectEventState(state).update);

  return (
    <Tooltip
      arrow
      placement='top'
      title={
        <Grid container>
          <Grid item xs={12}>
            Событие создано: <b>{formatter.format(new Date(create))}</b>.
          </Grid>
          <Grid item xs={12}>
            Последний раз редактировалось: <b>{formatter.format(new Date(update))}</b>.
          </Grid>
        </Grid>
      }
    >
      <HelpOutlineTwoToneIcon />
    </Tooltip>
  );
});
