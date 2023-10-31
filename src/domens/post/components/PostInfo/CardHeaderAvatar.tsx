import HelpOutlineTwoToneIcon from '@mui/icons-material/HelpOutlineTwoTone';
import { Grid, Tooltip } from '@mui/material';
import React, { memo } from 'react';

import { PostType } from '../../../../typings/enum';
import dateTimeFormatDefault from '../../../../utils/helpers/dateTimeFormatDefault';
import { selectEventState } from '../../../events/store/eventsSelectors';
import { selectItemState } from '../../../items/store/itemsSelector';
import { useStateSelector } from '../../../../store/store';

const formatter = new Intl.DateTimeFormat('ru', dateTimeFormatDefault);

export const CardHeaderAvatar = memo(function CardHeaderAvatar({ type }: { type: PostType }) {
  const { create, update } = useDatePost(type);

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

function useDatePost(type: PostType) {
  switch (type) {
    case PostType.event:
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useStateSelector((state) => ({
        create: selectEventState(state)?.create,
        update: selectEventState(state)?.update,
      }));
    case PostType.item:
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useStateSelector((state) => ({
        create: selectItemState(state)?.create,
        update: selectItemState(state)?.update,
      }));
  }
}
