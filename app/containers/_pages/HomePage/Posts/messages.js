import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage.Posts';

export default defineMessages({
  newTag: {
    id: `${scope}.newTag`,
    defaultMessage: 'Just added!',
  },
  scrollEnd: {
    id: `${scope}.scrollEnd`,
    defaultMessage: 'No more posts to show.',
  },
  readMore: {
    id: `${scope}.readMore`,
    defaultMessage: 'Read more...',
  },
});
