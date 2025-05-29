import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from "axios";

const Menubar = ()=>{

    const navigate = useNavigate();
    const{userData, backendURL,setUserData,setIsLoggedIn} = useContext(AppContext);
    const [dropDownOpen,setDropDownOpen] = useState(false);
    const dropDownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setDropDownOpen(false)
            }
        };
        document.addEventListener("mousedown",handleClickOutside);
        return () => document.removeEventListener("mousedown" , handleClickOutside);
    },[])

    const handleLogout = async() => {
        try{
            axios.defaults.withCredentials = true;
            const response =await axios.post(backendURL+"/logout");
            if(response.status === 200){
                    setIsLoggedIn(false);
                    setUserData(false);
                    setTimeout(() => navigate("/"), 1000); 
            }else{
                toast.error("Some error occured in logout");
            }
        }
        catch(error){
            // toast.error(error.response?.data?.message || "An error occurred");
            console.error(error);
        }
    }

    const sentVerificationOtp = async()=>{
        try{
            axios.defaults.withCredentials = true;
            const response = await axios.post(backendURL+"/send-otp");
            if(response.status === 200){
                navigate("/email-verify");
                toast.success("OTP has been sent successfully");
            }
            else{
                toast.error("Unable to Send OTP");
            }
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
    return(
        <>
        <nav className="navbar bg-white px- py-4 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap2">

                <img src={assets.logo_home} alt="logo" width={32} height={32} />
                <span className="fw-bold fs-4 text-dark">Authify</span>
            </div>

            {userData ? (
                <div className="position-relative" ref={dropDownRef}>
                    <div className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center" style={{
                        width:"40px",
                        height:"40px",
                        cursor:"pointer",
                        userSelect:"none",
                    }} 
                    onClick={()=> setDropDownOpen((prev)=> !prev)}
                    >
                        {userData.name[0].toUpperCase()}
                    </div>
                    {dropDownOpen && (
                        <div className="position-absolute shadow bg-white rounded p-2"
                        style={{
                            top:"50px",
                            right:"0",
                            zIndex:"100"
                        }}>
                            {!userData.isAccountVerified && (
                                <div className="dropDown-item py-1 px-2" style={{cursor:"pointer"}} onClick={sentVerificationOtp}>
                                    Verify Email
                                    </div>
                            )}
                            <div className="dropDown-item py-1 px-2 text-danger" style={{cursor:"pointer"}}
                            onClick={handleLogout}>
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            ) :(
                <div className="btn btn-outline-dark rounded-pill px-3" onClick={()=> navigate("/login")}>
                Login <i className="bi bi-arrow-right ms-2"></i>
            </div>

            )}

            
        </nav>
        </>
    )
}

export default Menubar;