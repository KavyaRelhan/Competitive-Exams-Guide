import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import ExamsDirectory from './pages/ExamsDirectory'
import Profile from './pages/Profile'
// import Home from './pages/Home'
import RefreshHandler from './pages/RefreshHandler'


function App() {

  const [isAuthenticated , setIsAuthenticated] = useState(false)
  const PrivateRoute = ({element})=>{
    return isAuthenticated? element : <Navigate to="/login" />
  }
  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to="/home"/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<PrivateRoute element={<Profile  isAuthenticated={isAuthenticated}/>}/>}/>
        <Route path='/exam-directory' element={<ExamsDirectory isAuthenticated={isAuthenticated}/>}/>
        <Route path='/home' element={<Homepage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
        {/* <Route path='/profile' element={<Profile/>} /> */}
      </Routes>
    </>
  )
}

export default App
