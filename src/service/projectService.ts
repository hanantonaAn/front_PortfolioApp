import { RootState } from '@/store/store';
import { IUser } from '@/types/user';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000",
  prepareHeaders: (headers, { getState }) => {
    // const token = (getState() as RootState).auth.access;
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
  credentials: 'include'
});

// const customFetchBase: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   await mutex.waitForUnlock();
//   let result = await baseQuery(args, api, extraOptions);

//   if ((result.error?.data as any)) {
//     if (!mutex.isLocked()) {
//       const release = await mutex.acquire();

//       try {
//         const refreshResult = await baseQuery(
//           { url: '/users/refresh', credentials: 'include' },
//           api,
//           extraOptions
//         );

//         // if (refreshResult.data) {
//         //   const { access } = refreshResult.data as any;
//         //   localStorage.setItem('token', access);
//         //   api.dispatch(setCredentials({ token: access }))
//         //   result = await baseQuery(args, api, extraOptions);
//         // } else {
//         //   api.dispatch(setCredentialsNull());
//         //   localStorage.removeItem('token')
//         // }
//       } finally {
//         release();
//       }
//     } else {
//       await mutex.waitForUnlock();
//       result = await baseQuery(args, api, extraOptions);
//     }
//   }

//   return result;
// };


export const projectApi = createApi({
  reducerPath: 'projectApi', // name api
  tagTypes: [
  'UserExperience', 
  'UserSkills', 
  'UserProfile',
  'Hashtag',
  'Slider',
  'Photo',
  'UserInfo',
  'Vacancy'
],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    // auth
    regUser: build.mutation<any, any>({
      query: (data) => ({
        method: 'POST',
        url: '/auth/users/',
        body: data,
      }),
    }),
    loginUser: build.mutation<any, any>({
      query: (data) => ({
        method: 'POST',
        url: '/auth/jwt/create',
        body: data,
      }),
    }),
    getUser: build.query<IUser, void>({
      query: () => ({
        url: '/auth/users/me/'
      }),
    }),
  }),
})

// export hook

export const {
  useRegUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useLazyGetUserQuery
} = projectApi;
