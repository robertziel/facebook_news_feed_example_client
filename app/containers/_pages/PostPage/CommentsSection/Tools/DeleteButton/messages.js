import { defineMessages } from 'react-intl';

export const scope =
  'app.containers.PostPage.CommentsSection.Tools.DeleteButton';

export default defineMessages({
  dialogTitle: {
    id: `${scope}.dialog.title`,
    defaultMessage: 'Are you sure?',
  },
  dialogExplanation: {
    id: `${scope}.dialog.explanation`,
    defaultMessage: 'After confirming you cannot revert this action.',
  },
  dialogConfirm: {
    id: `${scope}.dialog.confirm`,
    defaultMessage: 'Delete',
  },
  dialogCancel: {
    id: `${scope}.dialog.cancel`,
    defaultMessage: 'Cancel',
  },
});
