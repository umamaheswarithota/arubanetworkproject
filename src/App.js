import React from 'react'
import Nav1 from './components/Nav1'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Signup from './components/Signup'

const App = () => {
  return (
    <div>
    
      <BrowserRouter>
        <Nav1/>
      <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/' element={<Signup/>}/>
      </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App