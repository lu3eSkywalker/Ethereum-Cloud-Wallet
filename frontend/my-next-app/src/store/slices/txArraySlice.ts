import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransactionState {
  txHashForPopUp: string,
  txHashArray: string[];
  statusArray: any[];
}

const initialState: TransactionState = {
  txHashForPopUp: '',
  txHashArray: [],
  statusArray: [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTxHashForPopUp(state, action: PayloadAction<string>) {
      state.txHashForPopUp = action.payload; // Update txHash in the global state
    },
    setTxHashArray(state, action: PayloadAction<string[]>) {
      state.txHashArray = action.payload;
    },
    setStatusArray(state, action: PayloadAction<any[]>) {
      state.statusArray = action.payload;
    },
  },
});

export const { setTxHashForPopUp, setTxHashArray, setStatusArray, } = transactionSlice.actions;
export default transactionSlice.reducer;