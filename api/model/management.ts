// ログイン
export type LoginRequest = {
  email: string
  password: string
}

// 応募者ダウンロード request
export type ApplicantsDownloadRequest = {
  values: string[][]
  site: number
}

// ユーザー登録 request
export type UserCreateRequest = {
  name: string
  email: string
  role_id: number
}
