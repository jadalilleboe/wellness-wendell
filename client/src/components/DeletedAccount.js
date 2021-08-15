import React, { useEffect } from 'react'
import Button from 'react-bootstrap/button'
import { NavLink } from 'react-router-dom'

const DeletedAccount = ({ setUser }) => {
    useEffect(() => setUser(''))
    return (
    <div style={{textAlign: 'center'}}>
    <h1 class='subheading'>Wellness Wendell is sad to see you go!</h1>
    <NavLink exact to='/signup'><Button className='m-3'>Sign up for an account</Button></NavLink>
    </div>
    )
}

export default DeletedAccount