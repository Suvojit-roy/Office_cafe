import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import FormPage from "./components/screens/Forms/FormPage"
import Success from "./components/Success";
import Cafepage from "./components/Cafepage" 
import Home from './components/Home/Home';
import Signup from './components/auth/Signup/Signup';
import Login from './components/auth/Login/Login';
import Cart from './components/screens/Cart/Cart';

import React, { useEffect, useState } from 'react';
import  cartReducer from './cartReducer';
import Navbar from './components/Navbar/Navbar';



import {createStore} from 'redux';
import {reducer} from './reducer'



//react redux - provider wraps app,connect used in components
import {Provider} from 'react-redux';


//store.getstate()


//initial store


//dispatch method- send actions to store
//actions(objet) - must have type prop with string value- what kinf od action ex- increase deelete
//dont mutate the state

// store.dispatch({type:'DECREASE'})

//get store
// console.log(store.getState())
//gives me initial store

// reducer function 
//two args-state,action
//state- old state/state before update
//action- what happened/what update
//return updated state or old state


const Routing = ()=>
{
  return (
    <Switch>
    <Route exact path="/">
      <Home/>
    </Route>
    <Route exact path="/addDetails">
    <FormPage/>
    </Route>
    <Route exact path="/success/:id">
      <Success/>
    </Route>
    <Route exact path="/cafepage/:id">
      <Cafepage/>
    </Route>
    <Route exact path="/login">
      <Login/>
    </Route>
    <Route exact path="/signup">
      <Signup/>
    </Route>
    <Route exact path="/cafepage/browse">
      <Cafepage/>
    </Route>
    <Route exact path="/cart/:id">
      <Cart/>
    </Route>
    </Switch>
  )
}

//handles the routes
function App() {



  const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }; 


  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
      console.log(serializedState)
    } catch(err) {
      console.log(err)
    }
  };



 
  

  const[products,setProducts]=useState('');

  useEffect(() => {


    fetch("http://localhost:8000/cafe/foodList",
    {
      method:'GET'
    })
    .then(res=>res.json())
    .then(res=>{
  
      var dataset=res.data.results
      dataset=dataset.filter(item=>item.ItemName!='Wine');
      dataset.forEach(item=>
        {
          item.Price=(+item.Price)+20
        });
        setProducts(dataset)
    })
    .catch(err=>alert(err.error))
  },[])
  

  const persistedState = loadState();

  const initialStore = {
    cart:products,
    total:0,
    addedItems:[],
    amount:0,
    persistedState
  }
  
  
  
  
  //pass initial store
  const store=createStore(reducer,persistedState);
  // const store=createStore(reducer,persistedState);


  store.subscribe(() => {
    saveState({
     /* example state */
      cart:store.getState().cart,
      total:store.getState().total,
      addedItems:store.getState().addedItems,
      amount: store.getState().amount
    });
  });



  return(
<Provider store={store}>
<BrowserRouter>
<Routing/>
</BrowserRouter>
</Provider>
  )


}


export default App;
