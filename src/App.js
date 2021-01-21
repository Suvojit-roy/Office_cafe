import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import {useState} from 'react'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'

import Home from "./components/Home"
import Success from "./components/Success";
import Cafepage from "./components/Cafepage" 

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
    <Route exact path="/cafepage">
      <Cafepage/>
    </Route>
  </Switch>
</BrowserRouter>
  )

}

export default App;
