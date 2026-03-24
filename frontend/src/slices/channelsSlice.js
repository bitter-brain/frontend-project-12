import { createSlice } from '@reduxjs/toolkit'

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    activeChannel: null,
  },
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload
    },
  },
})

export const { setActiveChannel } = channelsSlice.actions
export default channelsSlice.reducer