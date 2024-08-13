
import './App.css';
import Home from './screens/Home.js'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Login from './screens/Login.js';
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder.js';
function App() {
  return (
    <CartProvider>
    <Router>

   
      <div>
      
         <Routes>
            <Route path="/" element = {<Home></Home>}></Route>
            <Route path="/login" element = {<Login></Login>}></Route>
            <Route path="/signup" element = {<Signup></Signup>}></Route>
            <Route path="/myOrder" element = {<MyOrder></MyOrder>}></Route>

         </Routes>
      
      </div>
    </Router>
    </CartProvider>
    
  );
}

export default App;
