import { gql } from '@apollo/client'

// get kit with limit
export const GET_KIT_WITH_LIMIT = gql`
  query GetKitWithLimit($limit: Int!) {
    getKitWithLimit(limit: $limit) {
      created_at
      id
      topic
    }
  }
`

// get kit by topic
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

// get all marks by topic
export const GET_MARK_LIST_BY_TOPIC = gql`
  query GetMarkListByTopic($topic: String!) {
    getMarkListByTopic(topic: $topic) {
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

// get mark by mark id
export const GET_MARK_BY_ID = gql`
  query GetMarkById($id: ID!) {
    getMarkById(id: $id) {
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

// get votes by mark id
export const GET_VOTES_BY_MARK_ID = gql`
  query GetVotesByMarkId($id: ID!) {
    getVotesByMarkId(id: $id) {
      created_at
      id
      mark_id
      upvote
      username
    }
  }
`
