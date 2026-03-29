import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: null,
  channelId: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.type = action.payload.type
      state.channelId = action.payload.channelId ?? null
    },
    closeModal: (state) => {
      state.type = null
      state.channelId = null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
