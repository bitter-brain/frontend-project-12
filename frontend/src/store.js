import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/authApi'
import { channelsApi } from './api/channelsApi'
import { messagesApi } from './api/messagesApi'
import authReducer from './slices/authSlice'
import channelsReducer from './slices/channelsSlice'
import messagesReducer from './slices/messagesSlice'
import modalReducer from './slices/modalSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware),

})

export default store