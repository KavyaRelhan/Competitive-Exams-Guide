import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
// import RefreshHandler from './Components/RefreshHandler'


function App() {

  // const [isAuthenticated , setIsAuthenticated] = useState(false)
  // const PrivateRoute = ({element})=>{
  //   return isAuthenticated? element : <Navigate to="/login" />
  // }

  return (
    <>
    {/* <RefreshHandler setIsAuthenticated={setIsAuthenticated}/> */}
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        {/* <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/> */}
        
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
