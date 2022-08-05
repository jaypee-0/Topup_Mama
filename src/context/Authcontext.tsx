import '../Styles/variables.scss'
import React from 'react';
import spinner from '../Assets/spinner.gif'
import axios from 'axios'
import swal from 'sweetalert'
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const Authcontext:any = React.createContext  

const AuthProvider = ({ children } : any) => {

  const [user, setuser] = React.useState(() => (localStorage.getItem('authtokens') ? jwt_decode(localStorage.getItem('authtokens')) : null))
  const [authtokens, setauthtokens] = React.useState(() => (localStorage.getItem('authtokens') ? JSON.parse(localStorage.getItem('authtokens')) : null));
  const [loading, setloading] = React.useState<Boolean>(true);

  const [errorlogin, seterrorlogin] = React.useState<Boolean>(false)
  const [errorreg, seterrorreg] = React.useState<Boolean>(false)

  const history = useNavigate();

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let target = e.target as HTMLInputElement
    await axios('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email: target.email.value,
        password: target.password.value,
      })
    }).then((response) => {
      let data = response.data;
      if (response.status === 200) {
        setauthtokens(data);
        setuser(jwt_decode(data.access))               
        localStorage.setItem('authtokens', JSON.stringify(data));
        seterrorlogin(null)
        history('/complete-profile');
      }
    }).catch(function (error) {
      console.log(error)
      if (error.response && error.response.status === 400) {
        let str = error.response.data.error;
        seterrorlogin(str)
      }
    })
  };

  // Logout
  const handleLogout = () => {  
    setuser(null);
    setauthtokens(null);
    localStorage.removeItem('authtokens');
    history('/');
  };

  // Register 
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios('https://reqres.in/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        first_name: e.target.firstName.value,
        last_name: e.target.lastName.value,
        email: e.target.email.value,
        password: e.target.password.value,
        is_tutor: true,
      }),
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        setuser(null)
        history('/home');
       } else {
        console.log(response.status);
      }
    }).catch(function (error) {
      if (error.response && error.response.status === 400) {
        let str = error.response.data;
        seterrorreg(str)
      } else {
        seterrorreg(null)
      }
    })
  };

  // Refresh Token
  const refreshToken = async () => {
    let response = await fetch('https://skilldizer.herokuapp.com/accounts/refresh/', {
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
      setuser(jwt_decode(data.access)) || setstudent(jwt_decode(data.access));
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
    handleLogin,
    handleLogout,
    handleRegister
  };

  React.useEffect(() => {
    let eightSeconds = 1000 * 8 * 1;
    if (loading) {
      refreshToken();
      setTimeout(() => {
        setloading(false);
      }, eightSeconds);
    }
    let thirtyMinutes = 1000 * 60 * 30;
    let interval = setInterval(() => {
      if (authtokens) {
        refreshToken();
      }
    }, thirtyMinutes);
    return () => clearInterval(interval);

  }, [authtokens, loading]);
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
