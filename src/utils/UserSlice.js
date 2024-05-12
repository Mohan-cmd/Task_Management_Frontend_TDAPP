import { createSlice } from "@reduxjs/toolkit";
import { AdminAccount } from "./constants";
const userSlice= createSlice({
    name: 'user',
    initialState:{
        userAccount:'',
        isAdmin:false,
        isManager:false,
        managers:[],
    },
    reducers:{
        addManagers:(state,action)=>{
          //  console.log('man:'+action.payload)
            state.managers.push(action.payload)
        },
        addUser:(state,action)=>{
            state.userAccount=action.payload;
          
            if(AdminAccount===state.userAccount){
                state.isAdmin=true;
            }else if(state.managers[0].includes(action.payload)){
                
                state.isManager=true;
            }
        }
        
    }

})

export const {addUser,addManagers}= userSlice.actions;
export default userSlice.reducer;
