import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUser } from '@/types/user'

type AuthState = {
  access: string | null
  refresh: string | null
  user: IUser | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access: typeof window !== 'undefined' ? window.localStorage.getItem('access') : null,
    user: null,
  } as AuthState,
  reducers: {
    setCredentials: (state, action) => {
      state.access = action.payload.access
      state.refresh = action.payload.refresh
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCredentialsNull: (state: AuthState) => {
      state.access = null;
      window.localStorage.setItem('access', '')
    },
  },
})

export const { setCredentials, setCredentialsNull, setUser } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.access
