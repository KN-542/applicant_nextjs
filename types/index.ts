// ログインユーザー model
export type UserModel = {
  hashKey: string
  name: string
  mail: string
}

// 設定 model
export type CommonModel = {
  errorMsg?: string
}

// 予約時間
export type ReserveTime = {
  time: Date
  isReserve: boolean
  isClicked: boolean
}
