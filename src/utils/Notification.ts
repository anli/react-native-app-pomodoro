import PushNotification from 'react-native-push-notification';

const LOCAL_NOTIFICATION_SCHEDULE_ID = '830397';

export const localNotificationSchedule = (message: string, seconds: number) => {
  PushNotification.localNotificationSchedule({
    id: LOCAL_NOTIFICATION_SCHEDULE_ID,
    message,
    date: new Date(Date.now() + seconds * 1000),
  });
};

export const cancelLocalNotificationSchedule = () => {
  PushNotification.cancelLocalNotifications({
    id: LOCAL_NOTIFICATION_SCHEDULE_ID,
  });
};
