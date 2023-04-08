const redux=require('redux');
const counterReducer=(state={counter:0},action)=>{
    return {
        counter:state.counter+1,
    }
}

const store=redux.createStore(counterReducer);
console.log(store.getState());
const conterSubscriber=()=>{
   const latestState= store.getState();
   console.log(latestState)
}

store.subscribe(conterSubscriber)
store.dispatch({type:'increment'})
store.dispatch({type:'increment'})
store.dispatch({type:'increment'})
store.dispatch({type:'increment'})
store.dispatch({type:'increment'})
