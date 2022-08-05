import '../styles/Nav.scss'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';
import React from 'react';
import picture from '../assets/logo/logo.jpg';

export function Nav() {
  let user, handleLogout = React.useContext(Authcontext)
  const [click, setClick] = React.useState<boolean>(false);
  const [switchnav, setswitchnav] = React.useState<boolean>(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const switchNav = () => {
    if (window.scrollY >= 250) {
      setswitchnav(true);
    } else {
      setswitchnav(false);
    }
  };
  React.useEffect(() => {
    switchNav();
    window.addEventListener('scroll', switchNav);
  }, []);

  return (
    <div className='container-sm-fluid'>
      <nav className={switchnav ? 'navbarT active' : 'navbarT'}>
        <div className='navbar-container'>
          <span className=' navbar-logo'>

          <Link to='/'>
            <img
              src={picture}
              width='50'
              height='50'
              alt='logo.png'
              />
          </Link>
              </span>
          <div className='menu-icon' onClick={handleClick}>
            <FA icon={click ? faTimes : faBars} />
          </div>
          <ul id='ul' className={click ? 'nav-menu active' : 'nav-menu ms--md-auto'}>
            <li className='nav-item'>
              <Link to={'/'} className='nav-links'>
                <span className='nav-links' onClick={closeMobileMenu}>
                  Home
                </span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/account'} className='nav-links'>
                <span className='nav-links' onClick={closeMobileMenu}>
                  Account
                </span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/users'} className='nav-links'>
                <span className='nav-links' onClick={closeMobileMenu}>
                  Users
                </span>
              </Link>
            </li>
          </ul>
          <span className='me-3'>

          {user ? <span onClick={()=> handleLogout}>Logout</span>
          :
          <span>Login</span>
        }
        </span>
        </div>
      </nav>
    </div>
  );
}
