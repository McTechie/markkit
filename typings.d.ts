type Comments = {
  created_at: string,
  mark_id: number,
  id: number,
  text: string,
  username: string,
}

type Votes = {
  created_at: string,
  mark_id: number,
  id: number,
  upvote: boolean,
  username: string,
}

type Kit = {
  created_at: string,
  id: number,
  topic: string,
}

type Mark = {
  created_at: string,
  username: string,
  body: string,
  id: number,
  image: string,
  title: string,
  kit_id: number,
  kit: Kit,
  voteList: Votes[],
  commentList: Comments[],
}
