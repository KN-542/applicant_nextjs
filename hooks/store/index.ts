import { green, indigo, red } from '@mui/material/colors'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CommonModel, UserModel } from 'types/index'

const state = {
  user: {
    hashKey: '',
    name: '',
    mail: '',
  } as UserModel,
  common: {
    errorMsg: '',
  } as CommonModel,
}

const initState = Object.assign({}, state)

export const slice = createSlice({
  name: 'slice',
  initialState: state,
  // Action
  reducers: {
    userDispatch: (state, action: PayloadAction<UserModel>) => {
      Object.assign(state.user, action.payload)
    },
    commonDispatch: (state, action: PayloadAction<CommonModel>) => {
      Object.assign(state.common, action.payload)
    },
  },
})

export const { userDispatch, commonDispatch } = slice.actions
