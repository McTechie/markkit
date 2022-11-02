import Timeago from 'react-timeago'
import Avatar from './Avatar'

import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
  FireIcon,
  ChatBubbleLeftRightIcon,
  GiftIcon,
  ShareIcon,
  BookmarkSquareIcon,
} from '@heroicons/react/24/outline'

interface MarkCardProps {
  mark: Mark;
}

const MarkCard = ({ mark }: MarkCardProps) => {
  return (
    <div className='flex my-6 shadow border border-gray-300 bg-white cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out rounded-tr-2xl rounded-bl-2xl'>
      {/* Votes */}
      <div className='flex flex-col items-center justify-start space-y-1 bg-gray-50 py-4 px-2 lg:px-4 text-gray-400 border-r-4 border-dashed rounded-bl-2xl'>
        <ArrowUpCircleIcon className='vote-icon hover:text-pink-400' />
        <p className='text-gray-600 font-bold'>
          0
        </p>
        <ArrowDownCircleIcon className='vote-icon hover:text-indigo-500' />
      </div>

      <div className='bg-gray-50 p-3 text-sm text-gray-500 flex-1 pl-5 rounded-tr-2xl'>
        {/* Header */}
        <div className='flex flex-row space-x-2 items-center'>
          <Avatar seed={mark.username} showBorder={true} />
          <p
            onClick={() => console.log('Navigate to Kit')}
            className='flex items-center space-x-1 my-2 hover:text-orange-400 hover:underline underline-offset-2 decoration-wavy group font-semibold'
          >
            <FireIcon className='h-5 w-5 text-teal-500 group-hover:animate-bounce group-hover:text-orange-400' />
            <span className='text-gray-700'>{mark.kit.topic}</span>
          </p>
          <p>
            ~ <span className='text-teal-500 font-bold truncate'>
              {mark.username}
            </span>
          </p>
          <div className='text-gray-400 hidden lg:inline'>
            | <Timeago date={mark.created_at} />
          </div>
        </div>

        <div className='text-gray-400 my-2 lg:hidden'>
          <Timeago date={mark.created_at} />
        </div>

        {/* Body */}
        <div className='pt-4 pb-2'>
          <h3 className='text-xl font-semibold text-gray-700'>{mark.title}</h3>
          <p className='text-sm mt-2 font-light'>{mark.body}</p>
        </div>
        
        {/* Image */}
        {mark.image && (
          <div className='py-4'>
            <img className='w-full' src={mark.image} alt={mark.title} />
          </div>
        )}
        
        {/* Footer */}
        <div className='py-2 relative -left-2 flex space-x-4 text-gray-400'>
          <div className='mark-icon'>
            <ChatBubbleLeftRightIcon className='h-6 w-6' />
            <p>{mark.commentList.length} <span className='hidden lg:inline'>Comments</span></p>
          </div>
          <div className='mark-icon'>
            <GiftIcon className='h-6 w-6' />
            <p className='hidden md:inline'>Award</p>
          </div>
          <div className='mark-icon'>
            <ShareIcon className='h-6 w-6' />
            <p className='hidden md:inline'>Share</p>
          </div>
          <div className='mark-icon'>
            <BookmarkSquareIcon className='h-6 w-6' />
            <p className='hidden md:inline'>Save</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarkCard
