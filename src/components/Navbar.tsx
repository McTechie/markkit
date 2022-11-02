import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'

import {
  BellIcon,
  ChatBubbleBottomCenterTextIcon,
  GlobeAsiaAustraliaIcon,
  PlusCircleIcon, 
  SparklesIcon,
  MegaphoneIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline'

import {
  Bars2Icon,
  ChevronDownIcon,
  HomeIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/solid'
import Avatar from './Avatar'

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className='sticky top-0 z-50 bg-white flex items-center px-4 py-2 shadow-sm text-gray-600'>
      {/* Navbar Brand */}
      <div className='scale-on-hover relative w-20 h-14'>
        <Image
          src='/logo.png'
          alt='Markkit'
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Dropdown Menu */}
      <div className='hidden lg:inline-flex items-center mx-7 cursor-pointer hover:shadow-sm'>
        <HomeIcon className='h-5 w-5' />
        <p className='ml-2 hidden lg:inline'>Home</p>
        <ChevronDownIcon className='h-5 w-5' />
      </div>

      {/* Search Input */}
      <form
        onSubmit={() => alert('This functionality would be coming soon...')}
        className='flex flex-1 items-center space-x-2 border border-gray-200 rounded-tr-2xl rounded-bl-2xl bg-gray-100 px-3 py-1 mx-5 text-sm lg:text-base'
      >
        <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />
        <input
          type='text'
          placeholder='Dive deeper into Markkit'
          className='flex-1 bg-transparent outline-none'
        />
        <button type='submit' hidden />
      </form>

      {/* Icons */}
      <div className='hidden lg:inline-flex items-center space-x-2 mx-5'>
        <SparklesIcon className='nav-icon' />
        <GlobeAsiaAustraliaIcon className='nav-icon' />
        <VideoCameraIcon className='nav-icon' />

        <hr className='h-10 border border-gray-100' />

        <ChatBubbleBottomCenterTextIcon className='nav-icon' />
        <BellIcon className='nav-icon' />
        <PlusCircleIcon className='nav-icon' />
        <MegaphoneIcon className='nav-icon' />
      </div>
      <div className='ml-5 lg:hidden'>
        <Bars2Icon className='nav-icon' />
      </div>

      {/* Authentication Button */}
      {session ? (
        <div
          onClick={() => {
            const userConfirmation = confirm('Do you want to log out?')

            if (userConfirmation) {
              signOut()
            }
          }}
          className='hidden lg:inline-flex items-center space-x-2 border border-gray-300 rounded-md p-1 scale-on-hover'
        >
          <Avatar showBorder={false} />

          <div className='flex-1 text-xs'>
            <p className='truncate text-sm'>{session.user?.name}</p>
            <p className='text-gray-400'>1 Chakra</p>
          </div>

          <ChevronDownIcon className='h-5 flex-shrink-0 text-gray-400' />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className='hidden lg:inline-flex grayscale items-center space-x-2 border border-gray-300 rounded-md p-1 scale-on-hover'
        >
          <Avatar showBorder={false} />

          <p className='text-sm'>Sign In</p>
        </div>
      )}
    </nav>
  )
}

export default Navbar
