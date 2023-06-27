import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './features/email/emailSlice';

export const store = configureStore({
  reducer: {
    emailSent: emailReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch