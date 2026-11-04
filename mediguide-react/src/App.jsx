import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Symptoms from './pages/Symptoms'
import Hospitals from './pages/Hospitals'
import Emergency from './pages/Emergency'
import Medicines from './pages/Medicines'
import Helplines from './pages/Helplines'
import Login from './pages/Login'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/symptoms" element={<Symptoms />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/helplines" element={<Helplines />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}