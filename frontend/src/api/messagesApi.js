import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '/messages',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: data => ({
        url: '/messages',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi
