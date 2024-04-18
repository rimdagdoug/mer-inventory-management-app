import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard" ;

import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials  = true;


function App() {
  return (
   <BrowserRouter>
   <ToastContainer />
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/forgot" element={<Forgot></Forgot>}></Route>
      <Route path="/resetpassword/:resetToken" element={<Reset></Reset>}></Route>
   

      <Route path="/dashboard" element={
        <Sidebar>
            <Layout>
              <Dashboard></Dashboard>
            </Layout>
        </Sidebar>}>

      </Route>
   
   
    </Routes>
   </BrowserRouter>
  );
}

export default App;
