import { gql } from '@apollo/client'

export const GET_KIT_BY_TOPIC = gql`
  query GetKitByTopic($topic: String!) {
    getKitListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`

// get all marks
export const GET_MARK_LIST = gql`
  query GetMarkList {
    getMarkList {
      id
      username
      created_at
      body
      image
      title
      kit_id
      kit {
        created_at
        id
        topic
      }
      voteList {
        created_at
        id
        mark_id
        upvote
        username
      }
      commentList {
        created_at
        mark_id
        id
        text
        username
      }
    }
  }
`
