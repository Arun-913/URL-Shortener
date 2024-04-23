// import { useState } from 'react'
import './App.css';
import { Signin } from './components/Signin';
import { Signup } from './components/Signup';
import { Landing } from './components/Landing';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={
            <>
              <Link className='btn' to='/signin'>SignIn</Link>
              <Link className='btn' to='/signup'>SignUp</Link>

            </>
          }></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/url' element={<Landing />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
