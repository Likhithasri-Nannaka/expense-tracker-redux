const redux=require('redux');
const counterReducer=(state={counter:0},action)=>{
   if(action.type==='increment')
   { return {
        counter:state.counter+1,
    }
}
if(action.type==='decrement')
{ return {
     counter:state.counter-1,
 }
}
if(action.type==='incrementby2')
{ return {
     counter:state.counter+2,
 }
}
if(action.type==='decrementby2')
{ return {
     counter:state.counter-2,
 }
}
return state;
}

const store=redux.createStore(counterReducer);
console.log(store.getState());
	@@ -14,7 +32,6 @@ const conterSubscriber=()=>{

store.subscribe(conterSubscriber)
store.dispatch({type:'increment'})
store.dispatch({type:'decrement'})
store.dispatch({type:'incrementby2'})
store.dispatch({type:'decrementby2'})
