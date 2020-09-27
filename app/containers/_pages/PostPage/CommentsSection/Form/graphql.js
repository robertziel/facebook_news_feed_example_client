import { gql } from '@apollo/client';

export const COMMENT_CREATE_MUTATION = gql`
  mutation commentCreate($postId: ID!, $content: String!) {
    commentCreate(postId: $postId, content: $content) {
      id
      success
      errors {
        message
        path
      }
    }
  }
`;
