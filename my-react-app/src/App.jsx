import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import ExamsDirectory from './pages/ExamsDirectory'
import Profile from './pages/Profile'
// import Home from './pages/Home'
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
        <Route path='/exam-directory' element={<ExamsDirectory/>}/>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </>
  )
}

export default App
