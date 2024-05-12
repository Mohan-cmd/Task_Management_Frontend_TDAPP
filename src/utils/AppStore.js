// import {configureStore,createReducer} from '@reduxjx/toolkit';
import { configureStore,createReducer } from '@reduxjs/toolkit';
import CartSlice from './CartSlice';
import UserSlice from './UserSlice';
import App from '../App';
const AppStore = configureStore({
    reducer:{
        cart: CartSlice,
        user: UserSlice
    }
});

export default AppStore;

