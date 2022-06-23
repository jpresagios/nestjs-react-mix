import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

// eslint-disable-next-line import/prefer-default-export
export const openNotificationWithIcon = (type: NotificationType, title: string, description: string) => {
  notification[type]({
    message: title,
    description,
  });
};
