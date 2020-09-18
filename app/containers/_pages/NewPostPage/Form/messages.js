import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NewPostPage/Form';

export default defineMessages({
  formTitle: {
    id: `${scope}.form.title`,
    defaultMessage: 'Title',
  },
  formContent: {
    id: `${scope}.form.content`,
    defaultMessage: 'Content',
  },
  formButton: {
    id: `${scope}.form.button`,
    defaultMessage: 'Create',
  },
  createdNotify: {
    id: `${scope}.notifications.createdNotify`,
    defaultMessage: 'Your post is now online!',
  },
  notValidNotify: {
    id: `${scope}.notifications.notValidNotify`,
    defaultMessage:
      'There are some issues with your post. Please check and fix errors in the form.',
  },
});
