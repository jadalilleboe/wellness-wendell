import React from 'react'
import Button from 'react-bootstrap/button'
import { NavLink } from 'react-router-dom'

const Welcome = (props) => {
    if (props.location.state) {
        return (
            <div style={{textAlign: 'center'}}>
                <h1 className='subheading'>Welcome to Wellness Wendell {props.location.state.name}!</h1>
                <p>Please sign in to get started.</p>
                <NavLink exact to='/signin'><Button className='mb-3'>Sign in</Button></NavLink>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Please sign up for a Wellness Wendell account.</h1>
                <NavLink exact to='/signup'><Button>Sign up</Button></NavLink>
            </div>
        )
    }
}
export default Welcome