import { gql } from '@apollo/client';

export const POST_UPDATE_MUTATION = gql`
  mutation postUpdate($id: ID!, $title: String!, $content: String!) {
    postUpdate(id: $id, title: $title, content: $content) {
      id
      success
      errors {
        message
        path
      }
    }
  }
`;
