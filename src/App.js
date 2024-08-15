import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Ultrafilter from './components/Ultrafilter';

function App() {
  return (
    <div className="App">

      <Navbar />
      <Ultrafilter/>
      <Home/>
      
    </div>
  );
}

export default App;
