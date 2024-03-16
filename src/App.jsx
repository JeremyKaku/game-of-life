import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Grid from './pages/Grid'
import Credits from './pages/Credits'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <NavBar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/grid' element={<Grid />} />
          <Route path='/credits' element={<Credits />} />
        </Routes>
      </div>
    </>
  )
}

export default App;