import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { slice } from '.'

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = persistReducer(persistConfig, slice.reducer)

const store = configureStore({
  reducer: reducer,
  middleware: [thunk],
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
