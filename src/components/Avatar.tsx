import { useSession } from 'next-auth/react'
import Image from 'next/image'

interface AvatarProps {
  showBorder: boolean
}

const Avatar = ({ showBorder }: AvatarProps) => {
  const { data: session } = useSession()

  return (
    <div className={`${showBorder && 'border border-gray-300 rounded-tr-2xl rounded-bl-2xl'} grayscale overflow-hidden scale-on-hover bg-white`}>
      <Image
        src={`https://avatars.dicebear.com/api/open-peeps/${session?.user?.name || 'placeholder'}.svg`}
        alt={session?.user?.name || 'placeholder'}
        width={40}
        height={40}
      />
    </div>
  )
}

export default Avatar
