import axios from 'axios'
import { APICommonHeader } from '.'
import { ApplicantsDownloadRequest } from './model/management'

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
