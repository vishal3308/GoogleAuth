import './App.css';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
import PrivateComponent from './PrivateComponent';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import Signup from './Component/Sign_Login/Signup';
import Login from './Component/Sign_Login/Login';
import Logout from './Component/Logout';
import Authenticate from './Component/Authenticate';
import Addproduct from './Component/Addproduct';
import Productlist from './Component/Productlist';
import UpdateProduct from './Component/UpdateProduct';
import './style/sign_Login.css';
import './style/nav_product.css';
import './style/vishalstore.css';
import { createContext } from 'react';
export const Url = createContext();
function App() {
  return (
    <div className="wrapper">
      <Url.Provider value={'http://localhost:4000/api'}>
        <BrowserRouter>
        <div className='logo'>
          <Link to="/">
            <img src='/Vishalstore.png' alt="logo"/>
          </Link>
        </div>
          
          <Navbar />
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path='/about' element={<h1>About Page</h1>}></Route>
              <Route path='/productlist' element={<Productlist/>}></Route>
              <Route path='/addproduct' element={<Addproduct/>}></Route>
              <Route path='/updateproduct/:id' element={<UpdateProduct/>}></Route>
              <Route path='/about' element={<h1>About E-commerce Page</h1>}></Route>
              <Route path='/contact' element={<h1>Contact Page</h1>}></Route>
              <Route path='/logout' element={<Logout />}></Route>
            </Route>
            <Route path='/Authenticate' element={<Authenticate />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/' element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </Url.Provider>
    </div>

  );
}

export default App;
