import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import Store from './Store/index'
import Navigation from './Routes/index'

function App() {
  return (
      <Navigation>
    <Provider store={Store}>

    <div className="App">

    </div>
          </Provider>
      </Navigation>
  );
}

export default App;
