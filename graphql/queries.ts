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
