import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PostPage.CommentsSection';

export default defineMessages({
  newTag: {
    id: `${scope}.newTag`,
    defaultMessage: 'Just added!',
  },
  scrollEnd: {
    id: `${scope}.scrollEnd`,
    defaultMessage: 'No more comments to show.',
  },
});
