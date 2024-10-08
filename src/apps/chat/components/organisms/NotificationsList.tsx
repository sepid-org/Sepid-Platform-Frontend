import {
  Button,
  MenuList,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationListItem from 'commons/components/molecules/listItems/NotificationListItem';
import { Link } from 'react-router-dom';
import { MessageType } from 'apps/chat/types/models';
import { useGetWidgetsByIdsQuery } from 'apps/website-display/redux/features/widget/WidgetSlice';

type NotificationsListPropsType = {
  notifications: MessageType[];
}

const NotificationsList: FC<NotificationsListPropsType> = ({
  notifications
}) => {

  // const { data } = useGetWidgetsByIdsQuery({ ids: ['200', '201'] });

  const seeAllNotifications = () => {
    // todo
  }

  return (
    <MenuList component={Paper}
      sx={{
        width: { xs: 300, md: 400 },
        padding: 0,
      }}>
      {notifications.length > 0 ?
        <Stack>
          <Stack
            borderBottom={'1px solid #ccc'}
            direction={'row'}
            padding={1}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Typography variant="h3">
              {'اعلان‌ها'}
            </Typography>
            <Button variant='outlined' size='small' onClick={seeAllNotifications}>
              {'خواندن همه'}
            </Button>
          </Stack>
          <Stack overflow={'auto'} maxHeight={400}>
            {notifications
              .sort((a, b) => b.received_datetime - a.received_datetime)
              .map((notification) => (
                <NotificationListItem key={notification.id} notification={notification} />
              ))}
            <Typography textAlign={'center'} padding={1} component={Link} to={'/notifications/'} variant='button' color={'secondary'}>
              {'مشاهده‌ی همه‌ی اعلان‌ها...'}
            </Typography>
          </Stack>
        </Stack>
        :
        <Stack alignItems={'center'} justifyContent={'center'} padding={2} spacing={1}>
          <NotificationsNoneIcon sx={{ fontSize: 54 }} />
          <Typography textAlign={'center'} fontSize={18} fontWeight={400}>
            {'اعلان خوانده‌نشده‌ای ندارید🤝'}
          </Typography>
          <Typography component={Link} to={'/notifications/'} variant='button' color={'secondary'}>
            {'مشاهده‌ی همه‌ی اعلان‌ها'}
          </Typography>
        </Stack>
      }
    </MenuList>
  );
}

export default NotificationsList;
