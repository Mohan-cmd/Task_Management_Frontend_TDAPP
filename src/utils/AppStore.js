// import {configureStore,createReducer} from '@reduxjx/toolkit';
import { configureStore,createReducer } from '@reduxjs/toolkit';
import CartSlice from './CartSlice';
import UserSlice from './UserSlice';
import App from '../App';
import TransferSlice from './TransferSlice';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';
const AppStore = configureStore({
    reducer:{
        cart: CartSlice,
        user: UserSlice,
        transfer: TransferSlice
    }
});

// const customizedMiddleware = getDefaultMiddleware({
//     serializableCheck: false,
//    // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(createCustomMiddleWare())
//   })

export default AppStore;

