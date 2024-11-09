import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function Home(){
    const [loggedInUser , setLoggedInUser] = useState(''); 
    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    })

    const navigate = useNavigate();

    const handleLogout = (e)=>{
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        handleSuccess("User logged out successfully")
        setTimeout(()=>{
            navigate('/login');
        },1000)
    }

    useEffect(()=>{
        
    })

    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <ToastContainer/>
        </div>
    )
}

export default Home;