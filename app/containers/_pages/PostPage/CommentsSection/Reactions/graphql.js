import { gql } from '@apollo/client';

export const REACT_TO_COMMENT_MUTATION = gql`
  mutation commentReact($id: ID!, $reactionType: String!) {
    commentReact(id: $id, reactionType: $reactionType) {
      success
      comment {
        likeReactionsCount
        smileReactionsCount
        thumbsUpReactionsCount
        currentUserReactionType
      }
    }
  }
`;
