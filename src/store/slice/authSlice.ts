import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { UserDataByUser } from '@/types/userDataByUser'
import { projectApi } from '@/service/projectService'
import { userDataByUserService } from '@/service/userDataByUserService'
import { IUser } from '@/types/user'

type AuthState = {
  access: string | null
  refresh: string | null
  user: UserDataByUser[] | null
  me: IUser | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access: typeof window !== 'undefined' ? window.localStorage.getItem('access') : null,
    user: null,
    me: null
  } as AuthState,
  reducers: {
    setCredentials: (state, action) => {
      state.access = action.payload.access
      state.refresh = action.payload.refresh
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.user = action.payload.me;
    },
    setCredentialsNull: (state: AuthState) => {
      window.localStorage.setItem('access', '')
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      projectApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.me = payload;
      }
    );
    builder.addMatcher(
      userDataByUserService.endpoints.getUserDataByUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    )
  }
})

export const { setCredentials, setCredentialsNull, setUser } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.access
