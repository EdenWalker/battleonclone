import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import Arena from "./Arena";
import Shop from "./Shop";
import Register from "./Register"
import ShoppingCart from "./ShoppingCart";
import Confirmation from "./Confirmation";
import Inventory from "./Inventory"
import PurchaseSuccess from "./PurchaseSuccess";

import { Route, Switch ,useLocation} from "wouter";
import { useFlashMessage } from './flashmsg';

function App() {
  const [isNavbarShowing, setIsNavbarShowing] = useState(false);
  const [key, setKey] = useState(0);
  const [, setLocation] = useLocation(); 
  const { getMessage, clearMessage  } = useFlashMessage();
  const flashmsg = getMessage();

  useEffect(() => {

    const timer = setTimeout(() => {
      clearMessage();
    }
    , 10000);
    return () => {
      clearTimeout(timer);
    };
  }
  , [flashmsg])


  const toggleNavbar = (value) => {
    setIsNavbarShowing(value);
  };
  const checkNavbarVisibility = () => {
    if (window.innerWidth >= 992) {
      toggleNavbar(true); 
    } else {
      toggleNavbar(false); 
    }
  };

  useEffect(() => {
    checkNavbarVisibility();
    window.addEventListener("resize", checkNavbarVisibility);

    return () => {
      window.removeEventListener("resize", checkNavbarVisibility);
    };
  }, []); 



  return (
    <>
      <Navbar isNavbarShowing={isNavbarShowing} toggleNavbar={toggleNavbar} />
      <Header />
      
      {flashmsg.message && (
        <div className={`alert alert-${flashmsg.type} text-center flash-alert`} role="alert">
          {flashmsg.message}
        </div>
      )}

<Switch>
  <Route path="/" children={<HomePage key={key} />} />
  <Route path="/register" children={<Register key={key} />} />
  <Route path="/about" children={<About key={key} />} />
  <Route path="/arena" children={<Arena key={key} />} />
  <Route path="/shop" children={<Shop key={key} />} />
  <Route path="/cart" children={<ShoppingCart key={key} />} />
  <Route path="/confirmation" children={<Confirmation key={key}/>} />
  <Route path="/PurchaseSuccess" children={<PurchaseSuccess key={key}/>} />
  <Route path="/Inventory" children={<Inventory key={key}/>} />
  <Route path="/login" children={<UserLogin key={key}/>} />
  <Route>
    <h1>404 - Page Not Found</h1>
  </Route>
</Switch>
      <Footer/>
     
    </>
  );
}

export default App;
