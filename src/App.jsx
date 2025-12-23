import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/nav'
import Home from './pages/home'
import AddEmploye from './pages/addEmploye'
import EditEmploye from './pages/editEmploye'
import ViewEmploye from './pages/viewEmploye'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/addEmploye' element={<AddEmploye/>}></Route>
        <Route path='/editEmploye' element={<EditEmploye/>}></Route>
        <Route path='/viewEmploye' element={<ViewEmploye/>}></Route>
      </Routes>
    </>
  )
}

export default App
