import React, {useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import axiosWithAuth from './axiosWithAuth';
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
      : <RenterHome/>
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