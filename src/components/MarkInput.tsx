import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { LinkIcon, PhotoIcon } from '@heroicons/react/24/outline'
import Avatar from './Avatar'
import toast from 'react-hot-toast'

// GraphQL imports
import client from '../../apollo-client'
import { useMutation } from '@apollo/client'
import { ADD_KIT_BY_TOPIC, ADD_MARK } from '../../graphql/mutations'
import { GET_KIT_BY_TOPIC, GET_MARK_LIST } from '../../graphql/queries'

type FormData = {
  markTitle: string;
  markBody?: string;
  markImage?: string;
  kit: string;
}

type MarkInputProps = {
  kit?: string;
}

const MarkInput = ({ kit }: MarkInputProps) => {
  const { data: session } = useSession()

  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormData>()

  const [addMark] = useMutation(ADD_MARK, {
    refetchQueries: [
      GET_MARK_LIST,
      'getMarkList'
    ]
  })
  const [addKitByTopic] = useMutation(ADD_KIT_BY_TOPIC)

  const onSubmit = async (data: FormData) => {
    const notification = toast.loading('Leaving your Mark...')

    try {
      const {
        data: { getKitListByTopic }
      } = await client.query({
        query: GET_KIT_BY_TOPIC,
        variables: {
          topic: kit || data.kit
        }
      })

      const kitExists = getKitListByTopic.length > 0

      if (!kitExists) {
        // create new kit by topic
        const {
          data: { insertKit: newKit }
        } = await addKitByTopic({
          variables: {
            topic: data.kit
          }
        })

        const markImage = data.markImage || ''

        // add mark to new kit
        await addMark({
          variables: {
            title: data.markTitle,
            body: data.markBody,
            image: markImage,
            kit_id: newKit.id,
            username: session?.user?.name,
          }
        })
      } else {
        const markImage = data.markImage || ''

        // add mark to previously existing kit
        await addMark({
          variables: {
            title: data.markTitle,
            body: data.markBody,
            image: markImage,
            kit_id: getKitListByTopic[0].id,
            username: session?.user?.name,
          }
        })
      }

      reset()

      toast.success('New Mark left!', {
        id: notification
      })
    } catch (e) {
      toast.error('Could not leave your Mark!', {
        id: notification
      })
      console.log(e)
    }
  }

  return (
    <>
      <div className='h-20 bg-slate-200 sticky top-16 z-40' />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='sticky top-24 z-50 px-2 py-2 -mt-20 bg-white border shadow rounded-tr-2xl rounded-bl-2xl'
      >
        <div className='flex items-center space-x-3'>
          <Avatar seed={session?.user?.name || ''} showBorder={true} />

          <input
            type='text'
            placeholder={session ? kit ? `Leave your mark in the ${kit} kit` : 'Leave your mark' : 'Sign in to leave your mark'}
            disabled={!session}
            className='flex-1 bg-gray-50 p-2 pl-5 outline-none rounded-tr-2xl rounded-bl-2xl w-full'
            {...register('markTitle', { required: true })}
          />

          <PhotoIcon
            onClick={() => setImageBoxOpen(imageBoxOpen => !imageBoxOpen)}
            className={`h-6 text-gray-400 scale-on-hover ${imageBoxOpen && 'text-teal-500'}`}
          />
          <LinkIcon className='h-6 text-gray-400 scale-on-hover' />
        </div>

        {!!watch('markTitle') && (
          <div className='flex flex-col py-4'>
            <div className='flex items-center px-2'>
              <p className='min-w-[80px]'>Body:</p>
              <input
                type='text'
                className='flex-1 m-2 p-2 outline-none bg-teal-50'
                placeholder={`What\'re you marking about? (optional)`}
                {...register('markBody')}
              />
            </div>

            {!kit && (
              <div className='flex items-center px-2'>
                <p className='min-w-[80px]'>Kit:</p>
                <input
                  type='text'
                  className='flex-1 m-2 p-2 outline-none bg-teal-50'
                  placeholder='Which kit are you marking?'
                  {...register('kit', { required: true })}
                />
              </div>
            )}

            {imageBoxOpen && (
              <div className='flex items-center px-2'>
                <p className='min-w-[80px]'>Image:</p>
                <input
                  type='text'
                  className='flex-1 m-2 p-2 outline-none bg-teal-50'
                  placeholder='Wanna add an image? (optional)'
                  {...register('markImage')}
                />
              </div>
            )}

            {Object.keys(errors).length > 0 && (
              <div className='space-y-2 p-2 text-rose-400 text-sm'>
                {errors.markTitle && <p>Mark title is required</p>}
                {errors.kit && <p>Kit is required</p>}
              </div>
            )}

            {!!watch('markTitle') && (
              <button className='my-3 ml-2 mr-4 rounded-tr-2xl rounded-bl-2xl bg-teal-400 hover:bg-teal-500 p-2 text-white transition duration-300 ease-in-out'>
                Leave Mark
              </button>
            )}
          </div>
        )}
      </form>
    </>
  )
}

export default MarkInput
