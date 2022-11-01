import { useSession } from 'next-auth/react'

const MarkInput = () => {
  const { data: session } = useSession()

  return (
    <div>

    </div>
  )
}

export default MarkInput
