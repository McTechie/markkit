import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Avatar from './Avatar'

type Props = {
  index: number,
  topic: string,
}

const KitListing = ({ index, topic }: Props) => {
  return (
    <div className='flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-bl-2xl text-gray-500 text-sm'>
      <p>{index + 1}</p>
      <ChevronDoubleUpIcon className='h-4 w-4 flex-shrink-0 text-teal-500' />
      <Avatar seed={`/kit/${topic}`} showBorder={false} />
      <p className='flex-1 truncate'>{topic}</p>
      <Link href={`/kit/${topic}`}>
        <button className='cursor-pointer rounded-full bg-teal-500 text-white px-2 py-1'>
          View
        </button>
      </Link>
    </div>
  )
}

export default KitListing
