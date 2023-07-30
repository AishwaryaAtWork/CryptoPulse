import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './Pages/Home';
import CoinPage from './Pages/CoinPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
        <Route path='/' Component={Home} exact/>
        <Route path='/coins/:id' Component={CoinPage}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
