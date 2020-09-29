import { gql } from '@apollo/client';

export const POST_QUERY = gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      content
      title
      createdAt
      user {
        avatar
        name
      }
    }
  }
`;
