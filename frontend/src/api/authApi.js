import { baseApi } from './baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
    signupUser: builder.mutation({
      query: (data) => ({
        url: '/signup',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useLoginUserMutation, useSignupUserMutation } = authApi
