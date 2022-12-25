import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './actions/userSlice';
import tabsReducer from './actions/tabsSlice';
import navReducer from './actions/navSlice';

export default configureStore({
    reducer: combineReducers({
        user: userReducer,
        tabs: tabsReducer,
        nav: navReducer,
    })
});