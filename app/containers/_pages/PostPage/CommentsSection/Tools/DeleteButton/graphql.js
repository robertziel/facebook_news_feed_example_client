import { gql } from '@apollo/client';

export const COMMENT_DELETE_MUTATION = gql`
  mutation commentDelete($id: ID!) {
    commentDelete(id: $id) {
      success
    }
  }
`;
