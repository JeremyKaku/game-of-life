import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import GameOfLife from './pages/GameOfLife'
import Credits from './pages/Credits'
import { Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>
      <NavBar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/game' element={<GameOfLife />} />
          <Route path='/credits' element={<Credits />} />
        </Routes>
      </div>
    </>
  )
}

export default App
