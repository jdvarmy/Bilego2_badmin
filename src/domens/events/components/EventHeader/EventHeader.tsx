import BlurLinearTwoToneIcon from '@mui/icons-material/BlurLinearTwoTone';
import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';
import OndemandVideoTwoToneIcon from '@mui/icons-material/OndemandVideoTwoTone';
import { Card, CardContent, CardHeader, Divider, Grid, Tab, Tabs } from '@mui/material';
import React, { ReactElement, SyntheticEvent, memo } from 'react';

import { EventHeaderType } from '../../../../typings/enum';
import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { eventsActions } from '../../store/eventsSlice';
import TabContent from './TabContent';

const headerMapNames: Record<EventHeaderType, { label: string; icon: ReactElement }> = {
  [EventHeaderType.image]: { label: 'Картинка', icon: <ImageTwoToneIcon fontSize='small' /> },
  [EventHeaderType.video]: { label: 'Видео', icon: <OndemandVideoTwoToneIcon fontSize='small' /> },
  [EventHeaderType.filter]: { label: 'Фильтр', icon: <BlurLinearTwoToneIcon fontSize='small' /> },
};

type Props = {
  type: EventHeaderType;
};

const EventHeader = ({ type }: Props) => {
  const actionsEvents = useActionCreators(eventsActions);

  console.log('render EventHeader');

  const handleChangeTab = (_: SyntheticEvent, newValue: EventHeaderType) => {
    actionsEvents.setEventStateField({ headerType: newValue });
  };

  return (
    <Card>
      <CardHeader title='Header события' />
      <Divider />
      <CardContent>
        <Grid container alignItems='center' spacing={3}>
          <Grid item xs={12}>
            <Tabs
              variant='scrollable'
              scrollButtons='auto'
              textColor='primary'
              indicatorColor='primary'
              value={type}
              onChange={handleChangeTab}
            >
              {Object.entries(headerMapNames).map(([key, { label, icon }]) => (
                <Tab key={key} label={label} value={key} icon={icon} iconPosition='start' />
              ))}
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            <TabContent tab={type} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(EventHeader);
