import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import {useState} from 'react'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'

import Home from "./components/Home"
import Success from "./components/Success";

function App() {

  return(
<BrowserRouter>
  <Switch>
    <Route exact path="/">
      <Home/>
    </Route>
    <Route exact path="/success">
      <Success/>
    </Route>
  </Switch>
</BrowserRouter>
  )

}

export default App;
