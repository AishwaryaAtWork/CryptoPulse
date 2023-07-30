import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './Pages/Home';
import CoinPage from './Pages/CoinPage';
import useStyles from './Styles/AppStyles';

function App() {

  const classes = useStyles()
  
  return (
    <BrowserRouter>
      <div className={classes.App}>
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
