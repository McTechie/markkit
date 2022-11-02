import { useSession } from 'next-auth/react'
import Image from 'next/image'

interface AvatarProps {
  showBorder: boolean,
  seed: string,
}

const Avatar = ({ showBorder, seed }: AvatarProps) => {
  const { data: session } = useSession()

  return (
    <div className={`${showBorder && 'border border-gray-300 rounded-tr-2xl rounded-bl-2xl'} grayscale overflow-hidden scale-on-hover bg-transparent`}>
      <Image
        src={`https://avatars.dicebear.com/api/open-peeps/${seed || 'placeholder'}.svg`}
        alt={session?.user?.name || 'placeholder'}
        width={40}
        height={40}
      />
    </div>
  )
}

export default Avatar
