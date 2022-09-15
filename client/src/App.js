import  {BrowserRouter as Router , Routes  , Route, useNavigate } from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import MyProfile from './pages/MyProfile';
import ProductDetails from './pages/ProductDetails';
import Products from './components/Products';
import MyProduct from './pages/MyProduct';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import { Profiler, useState } from 'react';
import Footer from './components/Footer';
import Contact from './components/Contact';
import axios from 'axios';
import { useEffect } from 'react';
import AdminPanel from './components/AdminPanel';
import {FaSolarPanel} from 'react-icons/fa'
import Users from './components/Users';
import Items from './components/Items';
import Comments from './components/Comments';
import Spinner from './components/Spinner/Spinner';
function App() {
  const [cart , setCart] =  useState('')
  const [profileUser , setProfileUser] = useState('')
  const [items  , setItems] = useState('')


  useEffect(()=>{
    const user = ()=>{

      axios.get('/user/me' , {
        headers:{
          
        }
      }).then((res)=>{
        setProfileUser(res.data);
      }).catch(err=>{
        console.log(err);
      })
    } 

    user()


    const getItem = ()=>{
      axios.get('/prod/').then(res=>{
        setItems(res.data.products)
      }).catch(err=>{
        console.log(err);
      })
    }

    getItem()
  } , [])

  if(items == '')
  return <Spinner/>
  return (
   
    
    <AnimatePresence exitBeforeEnter>
      <div className='relative' >
      <Router>
        
        <Header profileUser={profileUser} />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/profile' element={<MyProfile />} />
            <Route path='/product/:id' element={<ProductDetails profileUser={profileUser} setCart={setCart} cart={cart} />} />
            <Route path='/products' element={<Products items={items} />} />
            <Route path='/myproducts' element={<MyProduct/>} />
            <Route path='/new' element={<AddProduct profileUser={profileUser}/>} />
            <Route path='/cart' element={<Cart cart={cart}/>} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/adminPanel' element={<AdminPanel profileUser={profileUser}/>}/>
            <Route path='/adminPanel/users' element={<Users/>}/>
            <Route path='/adminPanel/items' element={<Items items={items} setItems={setItems}/>}/>
            <Route path='/adminPanel/comments' element={<Comments/>}/>
          </Routes>
          <Footer />
          <ToastContainer/>
      </Router>
      </div>
    </AnimatePresence>


  );
}

export default App;
