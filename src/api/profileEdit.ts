import { apiRequest } from './client'
import type {
  MemberProfile,
  SchoolRecord,
  SchoolType,
  SchoolVerificationInput,
  UpdateProfileInput,
  VerifiedSchool,
} from '../types/profile'

type UserSchoolResponse = {
  id: number
  type: SchoolType
  graduationYear: number
  name: string
  imageUrl: string | null
  address: string
  createdAt: string
}

type UserMeResponse = {
  id: number
  name: string
  phone: string | null
  address: string | null
  schools: UserSchoolResponse[]
}

type SchoolSearchResponse = {
  id: number
  name: string
  type: SchoolType
  address: string
}

type LinkedSchoolResponse = {
  id: number
  type: SchoolType
  graduationYear: number
  name: string
  imageUrl: string | null
  address: string
  createdAt: string
}

async function fetchUserMe(): Promise<UserMeResponse> {
  return apiRequest<UserMeResponse>('/api/users/me', {
    method: 'GET',
    auth: true,
  })
}

export async function fetchMemberProfile(): Promise<MemberProfile> {
  const data = await fetchUserMe()

  return {
    id: data.id,
    name: data.name,
    phone: data.phone ?? '',
    address: data.address ?? '',
    profileImageUrl: null,
  }
}

async function updateUserMe(input: UpdateProfileInput): Promise<UserMeResponse> {
  return apiRequest<UserMeResponse>('/api/users/me', {
    method: 'PUT',
    auth: true,
    body: JSON.stringify({
      name: input.name,
      phone: input.phone || null,
      address: input.address || null,
    }),
  })
}

export async function updateMemberProfile(
  input: UpdateProfileInput,
): Promise<MemberProfile> {
  const data = await updateUserMe(input)

  return {
    id: data.id,
    name: data.name,
    phone: data.phone ?? '',
    address: data.address ?? '',
    profileImageUrl: null,
  }
}

function mapUserSchoolToVerifiedSchool(school: UserSchoolResponse): VerifiedSchool {
  return {
    schoolId: school.id,
    type: school.type,
    name: school.name,
    address: school.address,
    graduationYear: school.graduationYear,
    certificateFileName: '',
  }
}

function mapLinkedSchoolToVerifiedSchool(school: LinkedSchoolResponse): VerifiedSchool {
  return {
    schoolId: school.id,
    type: school.type,
    name: school.name,
    address: school.address,
    graduationYear: school.graduationYear,
    certificateFileName: '',
  }
}

export async function fetchVerifiedSchools(): Promise<VerifiedSchool[]> {
  const data = await fetchUserMe()
  return data.schools.map(mapUserSchoolToVerifiedSchool)
}

export async function searchSchoolList(
  type: SchoolType,
  schoolName: string,
): Promise<SchoolRecord[]> {
  const keyword = schoolName.trim()
  const query = new URLSearchParams({ keyword })

  const data = await apiRequest<SchoolSearchResponse[]>(
    `/api/schools/search?${query.toString()}`,
    {
      method: 'GET',
      auth: true,
    },
  )

  return data
    .filter((school) => school.type === type)
    .map((school) => ({
      id: school.id,
      type: school.type,
      name: school.name,
      address: school.address,
    }))
}

async function linkExistingSchool(
  school: SchoolRecord,
  input: SchoolVerificationInput,
): Promise<LinkedSchoolResponse> {
  return apiRequest<LinkedSchoolResponse>(`/api/users/schools/${input.type}/link`, {
    method: 'POST',
    auth: true,
    body: JSON.stringify({
      id: school.id,
      graduationYear: input.graduationYear,
    }),
  })
}

async function createAndLinkSchool(
  input: SchoolVerificationInput,
): Promise<LinkedSchoolResponse> {
  return apiRequest<LinkedSchoolResponse>(`/api/users/schools/${input.type}/new`, {
    method: 'POST',
    auth: true,
    body: JSON.stringify({
      name: input.schoolName,
      address: input.region,
      graduationYear: input.graduationYear,
    }),
  })
}

export async function saveVerifiedSchool(
  input: SchoolVerificationInput,
): Promise<VerifiedSchool> {
  const schoolCandidates = await searchSchoolList(input.type, input.schoolName)

  const matchedSchool = schoolCandidates.find(
    (school) => school.name === input.schoolName,
  )

  const linkedSchool = matchedSchool
    ? await linkExistingSchool(matchedSchool, input)
    : await createAndLinkSchool(input)

  return mapLinkedSchoolToVerifiedSchool(linkedSchool)
}
