import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SideBarStoreModel, UserModel } from 'types/management'

const state = {
  management: {
    user: {
      sessionId: '',
      name: '',
      mail: '',
    } as UserModel,
    sidebar: {
      targetId: 0,
      targetName: '',
    } as SideBarStoreModel,
  },
}

const initState = Object.assign({}, state)

export const slice = createSlice({
  name: 'slice',
  initialState: state,
  // Action
  reducers: {
    mgUserSignIn: (state, action: PayloadAction<UserModel>) => {
      Object.assign(state.management.user, action.payload)
    },
    mgSideBarChange: (state, action: PayloadAction<SideBarStoreModel>) => {
      Object.assign(state.management.sidebar, action.payload)
    },
    mgSignOut: (state) => Object.assign(state, initState),
  },
})

export const { mgUserSignIn, mgSideBarChange, mgSignOut } = slice.actions
