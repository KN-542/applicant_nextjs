// ログイン
export type LoginRequest = {
  email: string
}
// hashKey only
export type HashKeyRequest = {
  hash_key: string
}
// MFA
export type MFARequest = {
  hash_key: string
  code: string
}
