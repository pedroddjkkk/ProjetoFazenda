import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './actions/userSlice';
import tabsReducer from './actions/tabsSlice';

export default configureStore({
    reducer: combineReducers({
        user: userReducer,
        tabs: tabsReducer,
    })
});