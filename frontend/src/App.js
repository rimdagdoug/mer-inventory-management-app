import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";


function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/forgot" element={<Forgot></Forgot>}></Route>
      <Route path="/resetpassword/:resetToken" element={<Reset></Reset>}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
