import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PostPage.CommentsSection';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Comments',
  },
  newTag: {
    id: `${scope}.newTag`,
    defaultMessage: 'Just added!',
  },
  scrollEnd: {
    id: `${scope}.scrollEnd`,
    defaultMessage: 'No more comments to show.',
  },
});
