import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Home from "./components/Home"
import Success from "./components/Success";
import Cafepage from "./components/Cafepage" 


//handles the routes
function App() {

  return(
<BrowserRouter>
  <Switch>
    <Route exact path="/">
      <Home/>
    </Route>
    <Route exact path="/success/:id">
      <Success/>
    </Route>
    <Route exact path="/cafepage/:id">
      <Cafepage/>
    </Route>
  </Switch>
</BrowserRouter>
  )

}

export default App;
