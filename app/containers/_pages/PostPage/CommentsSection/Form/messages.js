import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PostPage.CommentsSection.Form';

export default defineMessages({
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
    defaultMessage: 'Your comment has been added!',
  },
  notValidNotify: {
    id: `${scope}.notifications.notValidNotify`,
    defaultMessage:
      'There are some issues with your comment. Please check and fix errors in the form.',
  },
});
