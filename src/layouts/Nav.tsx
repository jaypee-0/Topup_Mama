import React from 'react';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import picture from '../assets/logo/logo.jpg';
import '../styles/Nav.scss'

export function Nav() {
  const [click, setClick] = React.useState(false);
  const [switchnav, setswitchnav] = React.useState(false);

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
              <Link to='/'>
                <span className='nav-links' onClick={closeMobileMenu}>
                  {' '}
                  Home
                </span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/account'>
                <span className='nav-links' onClick={closeMobileMenu}>
                  Account
                </span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/users' className='nav-links'>
                <span className='nav-links' onClick={closeMobileMenu}>
                  Users
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
