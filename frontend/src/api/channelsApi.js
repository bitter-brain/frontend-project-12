import { baseApi } from './baseApi'

export const channelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '/channels',
      providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: (data) => ({
        url: '/channels',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Channels'],
    }),
    renameChannel: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Channels'], // 🔥 ты забыл это
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels', 'Messages'], // 🔥 фикс
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi
