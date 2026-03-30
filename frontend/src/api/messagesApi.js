import { baseApi } from './baseApi'

export const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '/messages',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: '/messages',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
})

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi
