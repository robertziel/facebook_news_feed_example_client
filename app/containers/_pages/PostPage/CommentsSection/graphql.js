import { gql } from '@apollo/client';

export const COMMENTS_QUERY = gql`
  query comments($postId: ID!, $olderThanId: ID) {
    comments(postId: $postId, olderThanId: $olderThanId) {
      id
      content
      createdAt
      user {
        name
      }
    }
  }
`;
