import React from 'react';
import { BrowserRouter as Router,Routes, Route} from "react-router-dom"
import CoinDetails from './components/CoinDetails';
import Coins from './components/Coins';
import Exchanges from './components/Exchanges';
import Header from './components/Header';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={< Home />}/>
        <Route path='/coins' element={< Coins />} />
        <Route path='/exchanges' element={< Exchanges />} />
        <Route path='/coins/:id' element={< CoinDetails />} />
      </Routes>
    </Router>
  )
}

export default App;