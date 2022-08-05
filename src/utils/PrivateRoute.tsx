import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';

const PrivateRoute = (children: any) => {
  let user:any = React.useContext(Authcontext);
  if (user === null) {
    return <Navigate to='/' />;
  }
  return children ? children : <Outlet />;
};
export default PrivateRoute;