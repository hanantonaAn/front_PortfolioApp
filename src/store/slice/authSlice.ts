import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type AuthState = {
  access: string | null
  manager: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access: typeof window !== 'undefined' ? window.localStorage.getItem('access') : null,
    manager: null,
  } as AuthState,
  reducers: {
    setCredentials: (state, action ) => {
      state.access = action.payload
    },
    setUser: (state, action) => {
      state.manager = action.payload;
      console.log(state.manager)
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
