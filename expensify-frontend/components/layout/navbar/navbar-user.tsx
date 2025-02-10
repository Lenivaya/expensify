'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import { isNone } from '@/lib/utils'
import { graphql } from 'gql.tada'
import { useMemo } from 'react'
import { useQuery } from 'urql'

const NavbarUserQuery = graphql(`
  query NavbarUser {
    me {
      id
      username
      profilePictureUrl
    }
  }
`)

const extractUserNameTwoLetters = (username: string) => {
  return username.slice(0, 2)
}

export function NavbarUser() {
  const context = useMemo(
    () => ({ additionalTypenames: ['User'] }),
    []
  )
  const [{ data, fetching, error }] = useQuery({
    query: NavbarUserQuery,
    context
  })

  if (error) {
    console.error(error)
    return null
  }

  if (fetching) return null
  if (isNone(data?.me)) return null

  return (
    <div className='flex items-center gap-2 rounded-full pr-5 pl-5 transition-all duration-300 hover:bg-primary/10'>
      <span className='font-medium text-sm transition-colors duration-300 hover:text-primary'>
        {data?.me?.username}
      </span>
      <Avatar>
        <AvatarImage
          src={data?.me?.profilePictureUrl ?? ''}
        />
        <AvatarFallback className="truncate">
          {extractUserNameTwoLetters(data?.me?.username)}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
