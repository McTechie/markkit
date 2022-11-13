import type { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { GET_KIT_WITH_LIMIT } from '../../graphql/queries'
import { Feed, KitListing, MarkInput } from '../components'
import Head from 'next/head'

const Home: NextPage = () => {
  const { data } = useQuery(GET_KIT_WITH_LIMIT, {
    variables: { limit: 10 },
  })

  const kits: Kit[] = data?.getKitWithLimit

  return (
    <div className='max-w-5xl my-7 mx-auto px-4'>
      <Head>
        <meta charSet='UTF-8' />
        <link rel='icon' href='/favicon.ico' />
        <title>Markkit | Leave your mark on the Web</title>
        <meta name='description' content='A microblogging web app created by McTechie using NextJS, Tailwind, Supabase, GraphQL and StepZen!' />
      </Head>

      <MarkInput />
      
      <div className='flex'>
        <Feed />
        
        <div className='sticky top-44 mt-6 mx-5 hidden h-fit min-w-[300px] rounded-tr-2xl rounded-bl-2xl shadow border border-gray-300 bg-white lg:inline'>
          <p className='text-base mb-1 p-4 pb-3 font-bold text-gray-600'>Top Clans</p>

          <div>
            {kits?.map((kit, index) => (
              <KitListing key={kit.id} index={index} topic={kit.topic} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
