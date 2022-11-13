import { useQuery } from '@apollo/client'
import { LeapFrog } from '@uiball/loaders'
import { GET_MARK_LIST, GET_MARK_LIST_BY_TOPIC } from '../../graphql/queries'
import MarkCard from './MarkCard'

type FeedProps = {
  topic?: string
}

const Feed = ({ topic }: FeedProps) => {
  const { data, error } = !topic
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useQuery(GET_MARK_LIST) : useQuery(GET_MARK_LIST_BY_TOPIC, {
      variables: {
        topic
      }
    })

  const marks = !topic ? data?.getMarkList : data?.getMarkListByTopic

  if (!marks) {
    return (
      <div className='flex w-full items-center justify-center p-10 text-xl'>
        <LeapFrog size={50} color='#666666' />
      </div>
    )
  }

  return (
    <section>
      {error && (
        <div className='w-full bg-white my-10 text-center py-5 text-gray-400 rounded-tr-2xl rounded-bl-2xl'>
          <p>Could not load marks... X _ x</p>
        </div>
      )}

      {marks?.map((mark: Mark) => (
        <MarkCard
          key={mark.id}
          mark={mark}
          showDottedBorder={true}
          showComments={false}
        />
      ))}
    </section>
  )
}

export default Feed
