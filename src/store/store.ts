import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice';
import { projectApi } from '@/service/projectService';


export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      [projectApi.reducerPath]: projectApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectApi.middleware),
  });
}

export type AppState = ReturnType<typeof makeStore>

export type AppDispatch = AppState['dispatch']

export type RootState = ReturnType<AppState['getState']>