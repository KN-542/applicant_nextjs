import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SideBarStore } from 'types/management'

const state = {
  management: {
    sidebar: {
      targetId: 0,
      targetName: '',
    } as SideBarStore,
  },
}

export const slice = createSlice({
  name: 'slice',
  initialState: state,
  // Action
  reducers: {
    mgSideBarChange: (state, action: PayloadAction<SideBarStore>) => {
      Object.assign(state.management.sidebar, action.payload)
    },
  },
})

export const { mgSideBarChange } = slice.actions
