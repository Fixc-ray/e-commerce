import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cart from './components/Cart';
import Ultrafilter from './components/Ultrafilter';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<cart/>}/>
      </Routes>
      <Footer />
      
    </div>
    </Router>
  )
  
}

export default App;