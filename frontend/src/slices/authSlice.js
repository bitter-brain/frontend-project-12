import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  token: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username, token } = action.payload
      state.username = username
      state.token = token
    },
  },
})

export const { setCredentials } = slice.actions
export default slice.reducer
export const selectCurrentUsername = (state) => state.auth.username