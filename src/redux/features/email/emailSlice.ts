import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface EmailState {
  value: boolean;
}

const initialState: EmailState = {
  value: false,
}

export const emailSlice = createSlice({
  name: 'emailSent',
  initialState,
  reducers: {
    setSent: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
})

export const { setSent } = emailSlice.actions

export default emailSlice.reducer