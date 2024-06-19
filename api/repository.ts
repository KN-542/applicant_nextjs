import axios from 'axios'
import { APICommonHeader } from '.'
import {
  DesiredAtRequest,
  JWTDdcodeRequest,
  LoginRequest,
  LogoutRequest,
  MFACreateRequest,
  MFARequest,
  ReserveTableRequest,
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
export const LogoutCSR = async (req: LogoutRequest) => {
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
export const MFACreateCSR = async (req: MFACreateRequest) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_CSR_URL}/code_gen_applicant`,
    req,
    APICommonHeader,
  )
  return res
}

// JWT Decode CSR
export const JWTDecodeCSR = async (req: JWTDdcodeRequest) => {
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

// 面接可能日時取得 CSR
export const ReserveTableCSR = async (req: ReserveTableRequest) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_CSR_URL}/applicant/reserve_table`,
    req,
    APICommonHeader,
  )
  return res
}
