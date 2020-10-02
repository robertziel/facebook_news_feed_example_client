import { defineMessages } from 'react-intl';

export const scope =
  'app.containers.PostPage.CommentsSection.Tools.UpdateButton.Form';

export default defineMessages({
  formContent: {
    id: `${scope}.form.content`,
    defaultMessage: 'Content',
  },
  formButton: {
    id: `${scope}.form.button`,
    defaultMessage: 'Create',
  },
  updatedNotify: {
    id: `${scope}.notifications.updatedNotify`,
    defaultMessage: 'Your comment has been updated!',
  },
  notValidNotify: {
    id: `${scope}.notifications.notValidNotify`,
    defaultMessage:
      'There are some issues with your comment. Please check and fix errors in the form.',
  },
});
