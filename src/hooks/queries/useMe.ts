import { useQuery } from '@tanstack/react-query'
import { getMe } from '../../api/users'

export const useMe = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
  })
