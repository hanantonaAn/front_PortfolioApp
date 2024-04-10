import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { UserDataByUser } from '@/types/userDataByUser'
import { projectApi } from '@/service/projectService'
import { userDataByUserService } from '@/service/userDataByUserService'

type AuthState = {
  access: string | null
  refresh: string | null
  user: UserDataByUser[] | null
  username: string | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access: typeof window !== 'undefined' ? window.localStorage.getItem('access') : null,
    user: null,
    username: null
  } as AuthState,
  reducers: {
    setCredentials: (state, action) => {
      state.access = action.payload.access
      state.refresh = action.payload.refresh
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      console.log(state)
      state.username = action.payload.username;
    },
    setCredentialsNull: (state: AuthState) => {
      window.localStorage.setItem('access', '')
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      projectApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.username = payload.username;
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
