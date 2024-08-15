import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Ultrafilter from './components/Ultrafilter';

function App() {
  return (
    <div className="App">

      <Navbar />
      <Ultrafilter/>
      <Home/>
      <Footer />
      
    </div>
  )
  
}

export default App;