import axios from 'axios'
import { APICommonHeader } from '.'
import {
  ApplicantsDownloadRequest,
  UserCreateRequest,
} from './model/management'

// ログインCSR
export const loginCSR = async (baseUrl: string) => {
  const res = await axios.post(`${baseUrl}/login`, {}, APICommonHeader)
  return res
}
// ログインSSR
export const loginSSR = async () => {
  const res = await axios.post(
    `${process.env.NEXT_SSR_URL}/login`,
    {},
    APICommonHeader,
  )
  return res
}

// 応募者ダウンロード CSR
export const applicantsDownloadCSR = async (
  baseUrl: string,
  req: ApplicantsDownloadRequest,
) => {
  const res = await axios.post(
    `${baseUrl}/applicant/download`,
    req,
    APICommonHeader,
  )
  return res
}

// 応募者検索 SSR
export const applicantsSearchSSR = async () => {
  const res = await axios.post(
    `${process.env.NEXT_SSR_URL}/applicant/search`,
    APICommonHeader,
  )
  return res
}

// ユーザー一覧 SSR
export const UserListSSR = async () => {
  const res = await axios.post(
    `${process.env.NEXT_SSR_URL}/user/list`,
    APICommonHeader,
  )
  return res
}

// ユーザー登録 CSR
export const UserCreateCSR = async (
  baseUrl: string,
  req: UserCreateRequest,
) => {
  const res = await axios.post(`${baseUrl}/user/create`, req, APICommonHeader)
  return res
}

// ユーザーロール一覧 SSR
export const UserRoleListSSR = async () => {
  const res = await axios.post(
    `${process.env.NEXT_SSR_URL}/user/role_list`,
    APICommonHeader,
  )
  return res
}
