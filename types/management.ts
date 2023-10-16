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

// 応募者一覧 table body
export type ApplicantsTableBody = {
  // 氏名
  name: string
  // メールアドレス
  mail: string
  // 選考状況
  status: number | string
  // 面接予定日
  interviewerDate: string
  // 履歴書
  resume: JSX.Element
  // 職務経歴書
  curriculumVitae: JSX.Element
}

// table head sort
export type TableSort = {
  target: boolean
  isAsc: boolean
}

// table head
export type TableHeader = {
  id: number
  name: string
  sort?: TableSort
}
