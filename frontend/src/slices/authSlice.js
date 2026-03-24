import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('auth_token'),
  loggedIn: !!localStorage.getItem('auth_token'),
  username: localStorage.getItem('username'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token
      state.loggedIn = true
      state.username = action.payload.username
      localStorage.setItem('auth_token', action.payload.token)
      localStorage.setItem('username', action.payload.username)
    },
    logout: (state) => {
      state.token = null
      state.loggedIn = false
      state.username = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('username')
    },
  },
})

export const { loginSuccess, logout} = authSlice.actions
export default authSlice.reducer