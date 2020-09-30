import { gql } from '@apollo/client';

export const POST_DELETE_MUTATION = gql`
  mutation postDelete($id: ID!) {
    postDelete(id: $id) {
      success
    }
  }
`;
