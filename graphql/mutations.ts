import { gql } from '@apollo/client'

export const ADD_MARK = gql`
  mutation AddMark(
    $body: String!,
    $image: String!,
    $kit_id: ID!,
    $title: String!,
    $username: String!,
  ) {
    insertMark(
      body: $body
      image: $image
      kit_id: $kit_id
      title: $title
      username: $username
    ) {
      body
      created_at
      id
      image
      kit_id
      title
      username
    }
  }
`

export const ADD_KIT_BY_TOPIC = gql`
  mutation AddKitByTopic($topic: String!) {
    insertKit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`
