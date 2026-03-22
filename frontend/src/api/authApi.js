import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: data => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useLoginUserMutation } = authApi