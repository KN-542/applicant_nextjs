import axios from 'axios'
import { APICommonHeader } from '.'

// ログインCSR
export const loginCSR = async () => {
  console.log(process.env)
  //   console.log(import.meta.env)
  const res = await axios.post(
    `http://localhost:8080/login`,
    {},
    APICommonHeader,
  )
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
