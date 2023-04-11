import {createSlice} from '@reduxjs/toolkit'

const uiSlice=createSlice({
    name:'ui',
    initialState:{cartIsVisible:false},
    reducers:{
        toggle(){
            state.cartIsVisible=!state.cartIsVisible;
        }
    }
})
export default uiSlice.reducers;
export const uiActions=uiSlice.actions;