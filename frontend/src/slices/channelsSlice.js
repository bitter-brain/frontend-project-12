import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    activeChannel: null,
  },
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload
    },
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload
    },
  },
})

export const { setChannels, setActiveChannel } = channelsSlice.actions
export default channelsSlice.reducer