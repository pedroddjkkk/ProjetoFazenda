import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './actions/userSlice';

export default configureStore({
    reducer: combineReducers({
        user: userReducer,
    })
});