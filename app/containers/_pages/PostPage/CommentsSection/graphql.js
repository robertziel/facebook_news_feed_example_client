import { gql } from '@apollo/client';

export const COMMENTS_QUERY = gql`
  query comments($postId: ID!, $olderThanId: ID) {
    comments(postId: $postId, olderThanId: $olderThanId) {
      id
      content
      createdAt
      likeReactionsCount
      smileReactionsCount
      thumbsUpReactionsCount
      currentUserReactionType
      user {
        id
        avatar
        name
      }
    }
  }
`;

export const COMMENT_ADDED_SUBSCRIPTION = gql`
  subscription($postId: ID!) {
    commentAdded(postId: $postId) {
      id
      content
      createdAt
      likeReactionsCount
      smileReactionsCount
      thumbsUpReactionsCount
      user {
        id
        avatar
        name
      }
    }
  }
`;
