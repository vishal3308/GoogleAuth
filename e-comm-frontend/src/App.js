import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import PrivateComponent from './PrivateComponent';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Logout from './Component/Logout';
import Authenticate from './Component/Authenticate';
import './style/sign_Login.css';
import './style/nav_product.css';
import { createContext } from 'react';
export const Url=createContext();
function App() {
  return (
    <div className="row wrapper">
      <Url.Provider value={'http://localhost:4000'}>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path='/about' element={<h1>About Page</h1>}></Route>
        <Route path='/productlist' element={<h1>Product List Page</h1>}></Route>
        <Route path='/addproduct' element={<h1>Add Product Page</h1>}></Route>
        <Route path='/about' element={<h1>About E-commerce Page</h1>}></Route>
        <Route path='/contact' element={<h1>Contact Page</h1>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        </Route>
        <Route path='/Authenticate' element={<Authenticate/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login'element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
      </Url.Provider>
      </div>
    
  );
}

export default App;
