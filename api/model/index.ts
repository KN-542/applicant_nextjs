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
// 希望日時登録
export type DesiredAtRequest = {
  hash_key: string
  desired_at: string
}
