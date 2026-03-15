import { useQuery } from '@tanstack/react-query'
import { getSchoolMembers } from '../../api/users'

type UseSchoolMembersParams = {
  schoolId: number | null
  enabled: boolean
}

export const useSchoolMembers = ({ schoolId, enabled }: UseSchoolMembersParams) =>
  useQuery({
    queryKey: ['school-members', schoolId],
    queryFn: () => getSchoolMembers(schoolId as number),
    enabled: Boolean(schoolId) && enabled,
    retry: false,
  })
