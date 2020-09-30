import { store } from 'react-notifications-component';

import { getIntl } from 'containers/LanguageProvider/IntlCatcher';
import defaultSettings from 'containers/NotificationsSystem/defaultSettings';

import messages from './messages';

export function createdNotify() {
  store.addNotification({
    ...defaultSettings,
    message: getIntl().formatMessage(messages.createdNotify),
    type: 'success',
  });
}

export function notValidNotify() {
  store.addNotification({
    ...defaultSettings,
    message: getIntl().formatMessage(messages.notValidNotify),
    type: 'danger',
  });
}
