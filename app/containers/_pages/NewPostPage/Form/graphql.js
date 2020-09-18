import { gql } from '@apollo/client';

export const POST_CREATE_MUTATION = gql`
  mutation postCreate($title: String!, $content: String!) {
    postCreate(title: $title, content: $content) {
      id
      success
      errors {
        message
        path
      }
    }
  }
`;
