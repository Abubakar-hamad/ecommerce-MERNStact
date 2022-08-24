import  {BrowserRouter as Router , Routes  , Route } from 'react-router-dom'
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


function App() {
  return (
   

    <AnimatePresence exitBeforeEnter>
      <Router>
        <Header/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/profile' element={<MyProfile />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/products' element={<Products />} />
            <Route path='/myproducts' element={<MyProduct/>} />
            <Route path='/new' element={<AddProduct/>} />
            <Route path='/cart' element={<Cart/>} />
          </Routes>
          <ToastContainer/>
      </Router>

    </AnimatePresence>
    
  );
}

export default App;
