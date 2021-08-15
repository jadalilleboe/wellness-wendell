import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = ({ user }) => {
    const linkStyle = {
        textDecoration: 'none'
    }
    if (user === '') {
        return (
            <div className='non-user-nav container'>
                <NavLink exact to='/' style={linkStyle}><li className='nav-item'>Home</li></NavLink>
                <NavLink exact to='/about' style={linkStyle}><li className='nav-item'>About</li></NavLink>
                <NavLink exact to='/signup' style={linkStyle}><li className='nav-item'>Sign up</li></NavLink>
                <NavLink exact to='/signin' style={linkStyle}><li className='nav-item'>Sign in</li></NavLink>
            </div>
        )
    } else {
        return (
            <div className='user-nav container'>
                <NavLink exact to='/' style={linkStyle}><li className='nav-item'>Home</li></NavLink>
                <NavLink exact to='/' style={linkStyle}><li className='nav-item'>About</li></NavLink>
                <NavLink exact to='/dashboard' style={linkStyle}><li className='nav-item'>Change Wendell's messages</li></NavLink>
            </div>
        )
    }
}

export default Navigation