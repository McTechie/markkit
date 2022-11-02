import type { NextPage } from 'next'
import Head from 'next/head'
import { MarkInput } from '../components'

const Home: NextPage = () => {
  return (
    <div className='max-w-5xl my-7 mx-auto px-4'>
      <Head>
        <meta charSet='UTF-8' />
        <link rel='icon' href='/favicon.ico' />
        <title>Markkit | Leave your mark on the Web</title>
        <meta name='description' content='A microblogging web app created by McTechie using NextJS, Tailwind, Supabase, GraphQL and StepZen!' />
      </Head>

      <div>
         <MarkInput />
      </div>
    </div>
  )
}

export default Home
