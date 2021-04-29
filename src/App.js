import {Switch, Route} from 'react-router-dom'

//Pages
import Home from './components/Home/Home'

import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'

import ProtectedRoute from './components/ProtectedRoute'

import OwnerHome from './components/Owners/OwnerHome'
import CreateListing from './components/Owners/CreateListing'
import EditListing from './components/Owners/EditListing'

import RenterHome from './components/Renters/RenterHome'
import Cart from './components/Renters/Cart'

import MarketplaceHome from './components/Marketplace/MarketplaceHome'
import MarketItem from './components/Marketplace/MarketItem'

function App() {
  return (
    <div>
      <Switch>

        <Route exact path = "/">
          <Home/>
        </Route>

      {/* before ProtectedRoute */}
        <Route path = "/login">
          <Login/>
        </Route>

        <Route path = "/signup">
          <Signup/>
        </Route>

        <Route path = "/protectedRoute">
          <ProtectedRoute/>
        </Route>

      {/* Owner Accessible */}
        <Route exact path = "/owner/">
          <OwnerHome/>
        </Route>

        <Route path = "/create-listing/">
          <CreateListing/>
        </Route>


    
        <Route path = "/owner/edit-listing/:id">
          <EditListing/>
        </Route>

      {/* Renter Accessible */}
        <Route path = "/renter/">
          <RenterHome/>
        </Route>

        <Route path = "/renter/cart">
          <Cart/>
        </Route>

        <Route exact path = "/marketplace">
          <MarketplaceHome/>
        </Route>

        <Route path = "/marketplace/:id">
          <MarketItem/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
