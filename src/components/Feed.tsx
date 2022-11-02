import { useQuery } from '@apollo/client'
import { GET_MARK_LIST } from '../../graphql/queries'
import MarkCard from './MarkCard'

const Feed = () => {
  const { data, error } = useQuery(GET_MARK_LIST)

  return (
    <section>
      {error && (
        <div className='w-full bg-white my-10 text-center py-5 text-gray-400 rounded-tr-2xl rounded-bl-2xl'>
          <p>Could not load marks... X _ x</p>
        </div>
      )}

      {data && data.getMarkList?.map((mark: Mark) => (
        <MarkCard
          key={mark.id}
          mark={mark}
        />
      ))}
    </section>
  )
}

export default Feed
