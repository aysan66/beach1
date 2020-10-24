import React from 'react';
import{Route,Switch} from "react-router-dom";
import Navbar from "./components/Navbar"
import home from "./pages/home";
import rooms from "./pages/rooms";
import error from "./pages/error"
import SingleRoom from './pages/SingleRoom';
import './App.css';

function App() {
  return( <>
  <Navbar/>
  <Switch> 
    <Route exact path="/" component={home}/>
    <Route exact path="/rooms/" component={rooms}/>
    <Route exact path="/rooms/:slug" component={SingleRoom}/>
    <Route component={error}/>
 </Switch>

  
  
  
  </>)
    
}

export default App;
