import axios from 'axios'
import { APICommonHeader } from '.'
import {
  DesiredAtRequest,
  HashKeyRequest,
  LoginRequest,
  MFARequest,
} from './model'

// Login CSR
export const loginCSR = async (req: LoginRequest) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_CSR_URL}/login_applicant`,
    req,
    APICommonHeader,
  )
  return res
}

// Logout CSR
export const LogoutCSR = async (req: HashKeyRequest) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_CSR_URL}/logout_applicant`,
    req,
    APICommonHeader,
  )
  return res
}

// MFA CSR
export const MFACSR = async (req: MFARequest) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_CSR_URL}/mfa_applicant`,
    req,
    APICommonHeader,
  )
  return res
}

// MFA create CSR
export const MFACreateCSR = async (req: HashKeyRequest) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_CSR_URL}/code_gen_applicant`,
    req,
    APICommonHeader,
  )
  return res
}

// JWT Decode CSR
export const JWTDecodeCSR = async (req: HashKeyRequest) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_CSR_URL}/decode_applicant`,
    req,
    APICommonHeader,
  )
  return res
}

// 希望日時登録 CSR
export const DesiredAtCSR = async (req: DesiredAtRequest) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_CSR_URL}/applicant/desired`,
    req,
    APICommonHeader,
  )
  return res
}

// Documents CSR
export const DocumentsCSR = async (req: FormData) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_CSR_URL}/applicant/documents`,
    req,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    },
  )
  return res
}

// 日本の祝日取得
export const HolidaysJp = async () => {
  const res = await axios.get('https://holidays-jp.github.io/api/v1/date.json')
  return res
}
