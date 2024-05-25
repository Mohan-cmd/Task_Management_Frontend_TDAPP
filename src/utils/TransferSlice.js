import { createSlice } from "@reduxjs/toolkit";

const TransferSlice =createSlice({
    name:'transfer',
    initialState:{
       transactionHashs:[{fromAccount:'-',toAccount:'-',transactionHash:'-',transactionTokens:'-'}]
    },
    reducers:{
        addTransactionH:(state,action)=>{
            console.log('added to transactionhas: '+JSON.stringify(action.payload)) 
            state.transactionHashs.push(action.payload);
        }
    }
})

export const {addTransactionH} = TransferSlice.actions;
export default TransferSlice.reducer;
