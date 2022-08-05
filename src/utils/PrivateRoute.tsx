import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';

const PrivateRoute = (children: any) => {
  let user = useContext(Authcontext);
  if (!user) {
    return <Navigate to='/' />;
  }
  return children ? children : <Outlet />;
};
export default PrivateRoute;
