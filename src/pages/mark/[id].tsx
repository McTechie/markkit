import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import toast from 'react-hot-toast'
import Timeago from 'react-timeago'

import { INSERT_COMMENT } from '../../../graphql/mutations'
import { GET_MARK_BY_ID } from '../../../graphql/queries'
import { Avatar, MarkCard } from '../../components'

type FormData = {
  text: string
}

const MarkPage = () => {
  const router = useRouter()

  const { data: session } = useSession()

  const [insertComment] = useMutation(INSERT_COMMENT, {
    refetchQueries: [GET_MARK_BY_ID, 'getMarkById'],
  })

  const { register, handleSubmit, setValue } = useForm<FormData>()

  const { data } = useQuery(GET_MARK_BY_ID, {
    variables: { id: router.query.id },
  })

  const mark: Mark = data?.getMarkById

  const submitData = async (data: FormData) => {
    const notificaiton = toast.loading('Posting your comment...')

    await insertComment({
      variables: {
        mark_id: router.query.id,
        username: session?.user?.name,
        text: data.text,
      },
    })

    setValue('text', '')

    toast.success('Comment Successfully Posted!', {
      id: notificaiton
    })
  }

  return (
    <div className='mx-4 md:mx-auto my-7 max-w-5xl'>
      <MarkCard mark={mark} showComments={true} />

      {mark && (
        <>
          <div className='rounded-b-md border border-t-0 border-gray-300 bg-white pl-16 md:pl-20 -mt-1 py-4 shadow-md rounded-bl-3xl'>
            <p className='text-sm'>
              Comment as <span className='text-teal-500 font-semibold'>{session?.user?.name}</span>
            </p>

            <form onSubmit={handleSubmit(submitData)} className='mr-20 flex flex-col max-w-5xl'>
              <textarea
                disabled={!session}
                className='h-24 mt-2 md:mt-4 p-2 disabled:bg-gray-50 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm'
                placeholder={
                  session ? 'What are your thoughts?' : 'Sign in to comment...'
                }
                {...register('text')}
              />
              <button
                type='submit'
                disabled={!session}
                className='bg-teal-500 text-white font-semibold text-sm px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed my-4 hover:bg-teal-600 transition-all duration-300 ease-in-out'
              >
                Comment
              </button>
            </form>
          </div>

          <div className='rounded-bl-3xl -my-5 border border-t-0 border-gray-300 bg-white py-5 px-10'>
            <hr className='py-2' />
            {mark.commentList?.map((comment, index) => (
              <div
                className='relative flex items-center space-x-3 space-y-8'
                key={comment.id}
              >
                <hr className={`absolute top-10 h-20 left-8 border z-0 ${index === mark.commentList.length - 1 && 'hidden'}`} />
                <div className='bg-white w-fit rounded-tr-3xl rounded-bl-3xl z-20'>
                  <Avatar seed={comment.username} showBorder={true} />
                </div>

                <div className='flex flex-col'>
                  <p className='text-gray-400 text-xs -mt-2 space-x-1'>
                    <span className='font-semibold text-gray-600'>
                      {comment.username}
                    </span> •
                    <Timeago date={comment.created_at} />
                  </p>
                  <p className='text-sm text-gray-600'>
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MarkPage
