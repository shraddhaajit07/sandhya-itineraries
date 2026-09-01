import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import About from './pages/About'
import Itineraries from './pages/Itineraries'
import TripDetail from './pages/TripDetail'
import Gallery from './pages/Gallery'

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/itineraries/:id" element={<TripDetail />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </>
  )
}
