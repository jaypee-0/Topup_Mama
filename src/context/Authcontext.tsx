import '../Styles/variables.scss'
import React from 'react';
import spinner from '../Assets/spinner.gif'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const Authcontext:any = React.createContext  

const AuthProvider = ({ children } : any) => {

  const [user, setuser] = React.useState<any>(() => (localStorage.getItem('authtokens') ? jwt_decode(localStorage.getItem('authtokens') || "") : null))
  
  const [authtokens, setauthtokens] = React.useState(() => (localStorage.getItem('authtokens') ? JSON.parse(localStorage.getItem('authtokens') || "") : null));
  
  const [loading, setloading] = React.useState<Boolean>(true);

  const [errorlogin, seterrorlogin] = React.useState<Boolean>(false)
  const [errorreg, seterrorreg] = React.useState<Boolean>(false)

  const history = useNavigate();

  // Logout
  const handleLogout = () => {  
    setuser(null);
    setauthtokens(null);
    localStorage.removeItem('authtokens');
    history('/');
  };

  // Refresh Token
  const refreshToken = async () => {
    let response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: authtokens?.refresh,
      }),
    });
    let data = await response.json();
    if (response.status === 200 || response.status === 201) {
      setauthtokens(data);
      setuser(jwt_decode(data.access));
      localStorage.setItem('authtokens', JSON.stringify(data));
    } else {
      if (user === null){
        handleLogout();
      }
    }
    if (loading) {
      setloading(false);
    }
  };

  let contextData = {
    user,
    authtokens,
    errorlogin,
    errorreg,
    handleLogout,
  };

  // React.useEffect(() => {
  //   let eightSeconds = 1000 * 8 * 1;
  //   if (loading) {
  //     refreshToken();
  //     setTimeout(() => {
  //       setloading(false);
  //     }, eightSeconds);
  //   }
  //   let thirtyMinutes = 1000 * 60 * 30;
  //   let interval = setInterval(() => {
  //     if (authtokens) {
  //       refreshToken();
  //     }
  //   }, thirtyMinutes);
  //   return () => clearInterval(interval);

  // }, [authtokens, loading]);
  return (
    <Authcontext.Provider value={contextData}>
      {loading ? (
        <div className="vh-75 justify-content-center d-flex">
          <img className="align-self-center img-fluid" src={spinner} alt="" />
        </div>
      ) : (
        children
      )}
    </Authcontext.Provider>
  );
};
export default AuthProvider;
