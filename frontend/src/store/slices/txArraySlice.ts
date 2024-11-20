import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransactionState {
  txHashArray: string[];
  statusArray: any[];
}

const initialState: TransactionState = {
  txHashArray: [],
  statusArray: [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTxHashArray(state, action: PayloadAction<string[]>) {
      state.txHashArray = action.payload;
    },
    setStatusArray(state, action: PayloadAction<any[]>) {
      state.statusArray = action.payload;
    },
  },
});

export const { setTxHashArray, setStatusArray } = transactionSlice.actions;
export default transactionSlice.reducer;