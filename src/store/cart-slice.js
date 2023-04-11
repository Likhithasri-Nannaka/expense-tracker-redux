import {createSlice} from '@reduxjs/toolkit'

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        items:[],
        totalQuantity:0,
    },
    reducers:{
       addItemToCart(state,action){
        const newItem=action.payload;

        const existingItem=state.items.find((item)=>item.id===newItem.id)
        state.totalQuantity++;
        if(!existingItem){
            state.items.push({
                id:newItem.id,
                price:newItem.price,
                quantity:1,
                totalPrice:newItem.price,
                title:newItem.title
            })
        }
            else{
              existingItem.quantity++;
              existingItem.totalPrice=existingItem.totalPric+newItem.price
            }
        
       },
       removeItemFromCart(state,action){
       const id=action.payload;
       const existingItem=state.items.find(item=>item.id===id)
       state.totalQuantity--
       if(existingItem.quantity===1)
       {
        state.items=state.items.filter(item=>item.id!==id)
       }
       else{
        existingItem.quantity--;
        existingItem.totalPrice=existingItem.totalPrice-existingItem.price
       }    
       }
    }
})

const sendCartData=()=>{
    return async(dispatch)=>{
        dispatch(uiActions.showNotification({
            status:'pending',
            title:'sending...',
            message:'sending data to cart'
          }))


       const sendRequest=async()=>{
        const response=await fetch('https://advanced-redux-d8c56-default-rtdb.firebaseio.com/cart.json',{
            method:'PUT',
            body:JSON.stringify(cart)
          })
          if(!response.ok){
            throw new Error('sending cart data failed')
            
          }
       }
       
       try{
            await sendRequest();
            dispatch(uiActions.showNotification({
                status:'success',
                title:'sucesss...',
                message:'sent data to cart successfully'
              }))
        }
        catch(error){
            dispatch(uiActions.showNotification({
                status:'error',
                title:'Error...',
                message:'sending data to cart failed'
              }))
        }
       
     
    }
}
export default cartSlice.reducer;
export const cartActions=cartSlice.actions;