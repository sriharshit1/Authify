import { Route, Routes } from "react-router-dom";
import './App.css';
import {ToastContainer} from "react-toastify";
import Home from "./pages/Home";
import ResetPssword from "./pages/ResetPassword";
import EmailVerify from "./pages/EmailVerify";
import Login from "./pages/Login";

const App = ()=>{
    return(
        <>
        <div>
            <ToastContainer/>
            <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/email-verify" element={<EmailVerify/>}/>
                    <Route path="/reset-password" element={<ResetPssword/>}/>
            </Routes>
        </div>
        </>
    )
}

export default App;