import React from 'react';
import {Redirect} from 'react-router-dom'
import OwnerHome from './Owners/OwnerHome';
import RenterHome from './Renters/RenterHome';

// This is where you protect routes so users need a token to access

const ProtectedRoute = () => {

  const userType = localStorage.getItem("type")
  console.log(userType)

  return(
    <div>
    {
      userType === "owner"
      ? <OwnerHome/> 
      : userType === "renter"
        ? <RenterHome/>
        : <Redirect to='/login'/>
    }
    </div>
  )
}
// const ProtectedRoute = ({ component: Component, ...rest }) => {

//   return (<Route {...rest} render={
//     (props) => {
//       if (localStorage.getItem('token')) {
//         return <Component {...props} />; //returns to components if it gets the token
//       } else {
//         return <Redirect to='/login' />;  //redirects to login if it can't find a token
//       }
//     }}
//   />)
// }

export default ProtectedRoute;