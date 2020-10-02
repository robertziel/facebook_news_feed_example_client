import { gql } from '@apollo/client';

export const COMMENT_UPDATE_MUTATION = gql`
  mutation commentUpdate($id: ID!, $content: String!) {
    commentUpdate(id: $id, content: $content) {
      comment {
        content
        createdAt
        user {
          id
          avatar
          name
        }
      }
      success
      errors {
        message
        path
      }
    }
  }
`;
