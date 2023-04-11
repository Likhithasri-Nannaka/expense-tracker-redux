import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect,Fragment } from 'react';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial=true;

function App() {
  const dispatch=useDispatch();
  const showCart =useSelector(state=>state.ui.cartIsVisible)
  const notification=useSelector(state=>state.ui.notification)
  const cart=useSelector(state=>state.cart)
  useEffect(()=>{

    const sendCartData=async()=>{
      if(isInitial)
      {
        isInitial=false;
        return;
      }
      dispatch(uiActions.showNotification({
        status:'pending',
        title:'sending...',
        message:'sending data to cart'
      }))
      const response=await fetch('https://advanced-redux-d8c56-default-rtdb.firebaseio.com/cart.json',{
        method:'PUT',
        body:JSON.stringify(cart)
      })
      if(!response.ok){
        throw new Error('sending cart data failed')
        
      }
      dispatch(uiActions.showNotification({
        status:'success',
        title:'sucesss...',
        message:'sent data to cart successfully'
      }))

     
      
    }
    sendCartData().catch(err=>{
      dispatch(uiActions.showNotification({
        status:'error',
        title:'Error...',
        message:'sending data to cart failed'
      }))
    })
    
  },[cart,dispatch])
  return (
    <Fragment>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
    <Layout>
      {showCart &&<Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
