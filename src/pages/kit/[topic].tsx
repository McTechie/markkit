import { FireIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { Feed, MarkInput } from '../../components'
import Avatar from '../../components/Avatar'

const Kit = () => {
  const {
    query: { topic }
  } = useRouter()

  return (
    <div className={`h-24 bg-teal-500 p-8`}>
      <div className='flex flex-col items-center -mx-8 mt-10 bg-white'>
        <div className='w-20 h-20 relative'>
          <div className='absolute left-4 top-4 scale-[2] bg-white rounded-tr-2xl rounded-bl-2xl overflow-hidden -mt-5'>
            <Avatar seed={topic as string} showBorder={true} />
          </div>
        </div>
        <div>
          <h1 className='flex items-center text-gray-700 py-2 text-2xl font-light'>
            Welcome to the
            <span className='ml-1 mr-2 flex font-semibold text-teal-600 items-center'>
              <FireIcon className='h-10 w-10 text-teal-500 group-hover:animate-bounce group-hover:text-orange-400' /> {topic}
            </span>
            kit
          </h1>
        </div>
      </div>

      <div className='mt-8 max-w-5xl mx-auto pb-10'>
        <MarkInput kit={topic as string} />
        <Feed topic={topic as string} />
      </div>
    </div>
  )
}

export default Kit
