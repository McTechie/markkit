import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery } from '@apollo/client'
import { INSERT_VOTE } from '../../graphql/mutations'
import { GET_VOTES_BY_MARK_ID } from '../../graphql/queries'

import { LeapFrog } from '@uiball/loaders'
import Link from 'next/link'
import Avatar from './Avatar'
import Timeago from 'react-timeago'
import toast from 'react-hot-toast'

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
  mark: Mark
  showDottedBorder?: boolean
}

const MarkCard = ({ mark, showDottedBorder }: MarkCardProps) => {
  const { data: session } = useSession()
  
  const [vote, setVote] = useState<boolean>()

  const { data } = useQuery(GET_VOTES_BY_MARK_ID, {
    variables: { id: mark?.id },
  })

  const [insertVote] = useMutation(INSERT_VOTE, {
    refetchQueries: [GET_VOTES_BY_MARK_ID, 'getVotesByMarkId']
  })

  useEffect(() => {
    const votes: Votes[] = data?.getVotesByMarkId

    let vote = 0

    const displayNumber = votes?.reduce((acc, vote) => {
      if (vote.upvote) {
        return acc + 1
      } else {
        return acc - 1
      }
    }, 0)

    if (votes?.length === 0) {
      vote = 0
    }

    if (displayNumber === 0) {
      vote = votes[0]?.upvote ? 1 : -1
    }

    setVote(vote > 0)
  }, [data])

  const handleVoting = async (isUpVote: boolean) => {
    if (!session) {
      toast('You must be logged in to vote!')
      return
    }

    const notificaiton = toast.loading('Voting...')

    if (vote && isUpVote) return

    if (vote === false && isUpVote === false) return

    if (vote === false && isUpVote) {
      await insertVote({
        variables: {
          mark_id: mark?.id,
          username: session?.user?.name,
          upvote: true,
        },
      })
    } else if (vote && isUpVote === false) {
      await insertVote({
        variables: {
          mark_id: mark?.id,
          username: session?.user?.name,
          upvote: false,
        },
      })
    }

    toast.success('Vote Successfully Posted!', {
      id: notificaiton
    })
  }

  const displayVotes = (data: any) => {
    const votes: Votes[] = data?.getVotesByMarkId

    const displayNuymber = votes?.reduce((acc, vote) => {
      if (vote.upvote) {
        return acc + 1
      } else {
        return acc - 1
      }
    }, 0)

    if (votes?.length === 0) return 0

    if (displayNuymber === 0) {
      return votes[0]?.upvote ? 1 : -1
    }

    return displayNuymber
  }

  if (!mark) {
    return (
      <div className='flex w-full items-center justify-center p-5 text-xl'>
        <LeapFrog size={50} color='#666666' />
      </div>
    )
  }

  return (
    <Link href={`/mark/${mark.id}`}>
      <div className='flex mt-6 shadow border border-gray-300 bg-white cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out rounded-tr-2xl'>
        {/* Votes */}
        <div className={`flex flex-col items-center justify-start space-y-1 py-4 px-2 lg:px-4 text-gray-400 ${showDottedBorder && 'border-r-4 border-dashed '} rounded-bl-2xl`}>
          <ArrowUpCircleIcon
            onClick={() => handleVoting(true)}
            className={`vote-icon hover:text-pink-400 ${ displayVotes(data) > 0 && 'text-pink-400' }`}
          />
          <p className='text-gray-600 font-bold'>
            {displayVotes(data)}
          </p>
          <ArrowDownCircleIcon
            onClick={() => handleVoting(false)}
            className={`vote-icon hover:text-indigo-500 ${ displayVotes(data) < 0 && 'text-indigo-500' }`}
          />
        </div>

        <div className='p-3 text-sm text-gray-500 flex-1 pl-5 rounded-tr-2xl'>
          {/* Header */}
          <div className='flex flex-row space-x-2 items-center'>
            <Avatar seed={mark.username} showBorder={true} />
            <Link href={`/kit/${mark.kit.topic}`}>
              <p className='flex items-center space-x-1 my-2 hover:text-orange-400 hover:underline underline-offset-2 decoration-wavy group font-semibold'>
                <FireIcon className='h-5 w-5 text-teal-500 group-hover:animate-bounce group-hover:text-orange-400' />
                <span className='text-gray-700'>{mark.kit.topic}</span>
              </p>
            </Link>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
    </Link>
  )
}

export default MarkCard
