import './header.scss'

import { useState } from 'react'
import { motion } from 'framer-motion'
// images
import navdirt from '../../images/navdirt.svg'
import navdirtTablet from '../../images/navdirtTablet.svg'
import tree3 from '../../images/tree3.png'
import tree1 from '../../images/tree1.png'
import tree2 from '../../images/tree2.png'
import logo from '../../images/logo.png'
import homeIcon from '../../images/iconHome.svg'
import categoryIcon from '../../images/iconCategory.svg'
import userIcon from '../../images/iconUser.svg'
import leaderboardIcon from '../../images/iconLeaderboard.svg'

//components
import HamburgerButton from '../hamburgerButton/hamburgerButton'
import { NavLink, useNavigate } from 'react-router-dom'

const Header = ( {isHamburgerOpen, setIsHamburgerOpen}) => {
let navigate = useNavigate()
function onLogout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    navigate("/signIn");
    window.location.reload();
}
    return (
        <div className='header-container'>
        <header>
            {sessionStorage.getItem('token') ? <NavLink to="/newsfeed"><img alt='logo' className='logo' src={logo}/></NavLink> : <NavLink to="/signIn"><img alt='logo' className='logo' src={logo}/></NavLink>}
            <div className='tree-container'>
            <img alt='tree' className='tree1' src={tree1}/>
            <img alt='tree' className='tree2' src={tree2}/>
            <img alt='tree' className='tree3' src={tree3}/>
            </div>
            <HamburgerButton
            isHamburgerOpen={isHamburgerOpen}
            setIsHamburgerOpen={setIsHamburgerOpen}
            />
            <motion.nav 
            className="navbar-mobile"
            animate={isHamburgerOpen ? {x:-800}: {x : 0}}
            transition={{duration:0.5}}
            >
                <ul>
                    <NavLink onClick={() => (setIsHamburgerOpen(false))} to="/">
                        <div className='icon-text-container'>
                            <img alt='home icon' src={homeIcon}/>
                            <li>Home</li>
                        </div>
                        <span className='line'></span>
                    </NavLink> 
                    <NavLink onClick={() => (setIsHamburgerOpen(false))} to="categories">
                        <div className='icon-text-container'>
                            <img alt='home icon' src={categoryIcon}/>
                            <li>Categories</li>
                        </div>
                        <span className='line'></span>
                    </NavLink>
                    <NavLink onClick={() => (setIsHamburgerOpen(false))} to="leaderboard">
                        <div className='icon-text-container'>
                            <img alt='home icon' src={leaderboardIcon}/>
                            <li>Leaderboard</li>
                        </div>
                        <span className='line'></span>
                    </NavLink>
                    {sessionStorage.getItem('userId') ? <NavLink onClick={() => (setIsHamburgerOpen(false))} to="profile">
                        <div className='icon-text-container'>
                            <img alt='home icon' src={userIcon}/>
                            <li>Profile</li>
                        </div>
                        <span className='line'></span>
                    </NavLink> : null}
                </ul>
                {sessionStorage.getItem('userId') ? <button onClick={onLogout} className='sign-out-btn'>Sign out</button> : <button onClick={onLogout} className='sign-in-btn'>Sign in</button>}
            </motion.nav>
            <nav className='navbar-tablet'>
                <ul>
                    <NavLink to='/'>
                    <div className='cloud'>
                        <li>Home</li>
                    </div>
                    </NavLink>
                    <NavLink to='categories'>
                    <div className='cloud'>
                        <li>Categories</li>
                    </div>    
                    </NavLink>
                    <NavLink to='leaderboard'>
                        <div className='cloud'>
                            <li>Leaderboard</li>
                        </div>
                    </NavLink>
                    <NavLink to='profile'>
                        <div className='cloud'>
                            <li>Profile</li>
                        </div>
                    </NavLink>
                </ul>
            </nav>
        </header>
        <img className='dirt' alt='dirt' src={navdirt}/>
        <img className='dirt-tablet' alt='dirt' src={navdirtTablet}/>
        </div>

    
    )
}


export default Header 