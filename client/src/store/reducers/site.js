//site is very important for app normally, but not this app, we only use to handle layout in this app!
//it contain all the info about your site e.g:address,name, languages...

import { createSlice } from '@reduxjs/toolkit';

export const siteSlice = createSlice({
    name:'site',
    initialState:{
        layout:''
    },
    reducers:{
        setLayout:(state,action)=>{
            state.layout = action.payload
        }
    }
})

export const { setLayout } = siteSlice.actions;
export default siteSlice.reducer;