// レフトメニュー model
export type SideBarModel = {
  id: number
  name: string
  href: string
  icon: JSX.Element
  button?: () => void
}

// レフトメニュー store用model
export type SideBarStoreModel = {
  targetId: number
  targetName: string
}

// ログインユーザー model
export type UserModel = {
  sessionId: string
  name: string
  mail: string
}
