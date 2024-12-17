import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import Login from "./Login"
import { handleError, handleSuccess } from "../utils"
// import '../styles/login.css'

function Signup(){

    const [signupInfo , setSignupInfo] =useState({
        name:"",
        email:"",
        password:""
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name,value} =e.target;
        const copySignupInfo ={...signupInfo};
        copySignupInfo[name]=value;
        setSignupInfo(copySignupInfo); 
    }

    const handleSignup = async (e)=>{
        e.preventDefault();
        const {name, email , password} = signupInfo;
        if(!name || !email || !password){
            return handleError('All the three parameters are required')
        }
        try{
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(signupInfo)
            });
            const result = await response.json(); 
            const {success, message , error} = result;
            if(success){
                handleSuccess(message)
                setTimeout(()=>{
                    navigate('/login')
                },1000)
            }else if(error){
                const details = error.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message)
            }
            
        }catch(err){

        }
    }

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        autoFocus
                        placeholder="Enter your Name"
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="email"
                        placeholder="Enter your Email"
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type={isPasswordVisible ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter Password"
                        value={signupInfo.password}
                    />
                </div>
                <button>Signup</button>
                <span>Already have an account?
                    <Link to={"/login"}>Login</Link>
                </span>
            </form>
            
            <ToastContainer/>
        </div>
    )
}

export default Signup