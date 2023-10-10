// レフトメニュー model
type SideBarModel = {
  id: number
  name: string
  href: string
  target: boolean
  icon: JSX.Element
}

// レフトメニュー store
type SideBarStore = {
  targetId: number
  targetName: string
}

export type { SideBarModel, SideBarStore }
