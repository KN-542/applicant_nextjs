import axios from 'axios'
import { APICommonHeader } from '.'

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
