// import React from "react"
// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import {ToastContainer} from 'react-toastify'
// import { handleError, handleSuccess } from "../utils"
// import '../styles/login.css'

// function Login(){

//     const [loginInfo , setLoginInfo] =useState({
//         email:"",
//         password:""
//     })

//     const navigate = useNavigate();

//     const handleChange = (e)=>{
//         const {name,value} =e.target;
//         const copyLoginInfo ={...loginInfo};
//         copyLoginInfo[name]=value;
//         setLoginInfo(copyLoginInfo); 
//     }

//     const handleLogin = async (e)=>{
//         e.preventDefault();
//         const {email , password} = loginInfo;
//         if(!email || !password){
//             return handleError('All the parameters are required')
//         }
//         try{
//             const url = "http://localhost:8080/auth/login";
//             const response = await fetch(url,{
//                 method:"POST",
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 body:JSON.stringify(loginInfo)
//             });
//             const result = await response.json(); 
//             console.log(result);
            
//             const {email,success, message, jwtToken , name, error} = result;
//             if(success){
//                 handleSuccess(message)
//                 localStorage.setItem('token', jwtToken)
//                 localStorage.setItem('loggedInUser', email);
//                 localStorage.setItem('loggedUserName', name);
//                 setTimeout(()=>{
//                     navigate('/home')
//                 },1000)
//             }else if(error){
//                 const details = error.details[0].message;
//                 handleError(details);
//             }else if(!success){
//                 handleError(message)
//             }
            
//         }catch(err){
//             handleError(err);
//         }
//     }

    
//     // const [password, setPassword] = useState('');
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
//     // Toggle password visibility
//     const togglePasswordVisibility = () => {
//         setIsPasswordVisible(!isPasswordVisible);
//     };

//     return (
//         <div className="container">
//             <h1>Login</h1>
//             <form onSubmit={handleLogin}>
//                 <div >
//                     <label htmlFor="email">Email</label>
//                     <input
//                         onChange={handleChange}
//                         type="text"
//                         name="email"
//                         placeholder="Enter your Email"
//                         value={loginInfo.email}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password">Password</label>
//                     <input
//                         onChange={handleChange}
//                         type={isPasswordVisible ? 'text' : 'password'}

//                         name="password"
//                         placeholder="Enter Password"
//                         value={loginInfo.password}
//                     />
//                 </div>
//                 <button>Login</button>
//                 <span>Don't have an account?
//                     <Link to={"/signup"}>Signup</Link>
//                 </span>
//             </form>
            
//             <ToastContainer/>
//         </div>
//     )
// }

// export default Login;

import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "../styles/login.css";

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError("All the parameters are required");
        }
        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { email, success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("loggedInUser", email);
                localStorage.setItem("loggedUserName", name);
                setTimeout(() => {
                    navigate("/home");
                }, 1000);
            } else if (error) {
                handleError(error.details[0].message);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="background">
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="email"
                        placeholder="Enter your Email"
                        value={loginInfo.email}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="password-input-wrapper">
                        <input
                            onChange={handleChange}
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            placeholder="Enter Password"
                            value={loginInfo.password}
                            className="form-input pass-inp"
                        />
                        <button
                            type="button"
                            className="toggle-password-btn"
                            onClick={togglePasswordVisibility}
                        >
                            {isPasswordVisible ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
                <button type="submit" className="login-button">Login</button>
                <span className="signup-link-wrapper">
                    Don&apos;t have an account? <Link to="/signup" className="signup-link">Signup</Link>
                </span>
            </form>

            <ToastContainer />
        </div>
        </div>
    );
}

export default Login;
