import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/button'
import loginService from '../services/login'
import messageService from '../services/messages'
import ErrorNotification from './ErrorNotification'

const SignInPage = ({ setUser }) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState(null)
    const [ passwordVisibility, setPasswordVisibility ] = useState('password')

    const history = useHistory()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                email, password
            })

            window.localStorage.setItem(
                'loggedWWUser', JSON.stringify(user)
            )
            setUser(user)
            messageService.setToken(user.token)
            history.push('/dashboard')
        } catch (exception) {
            setErrorMessage('The email or password is incorrect.')
        }
    }
    return (
        <div style={{marginBottom: 20}}>
            <h1 className='subheading'>Sign in</h1>
            <ErrorNotification message={errorMessage} />
            <div className='form'>
            <form className='container-sm text-left'onSubmit={handleLogin}>
                <div class="form-group">
                    <label>Email</label>
                    <input value={email} type='email' name='email' onChange={({ target }) => setEmail(target.value)} className='input-field'/>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input value={password} type={passwordVisibility} onChange={({ target }) => setPassword(target.value)}/>
                    <span className='show-btn' onClick={() => passwordVisibility === 'password' ? setPasswordVisibility('text') : setPasswordVisibility('password')}>{passwordVisibility === 'password' ? 'Show' : 'Hide'}</span>
                </div>
                <div class='text-center'>
                <Button type='submit'>Submit</Button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default SignInPage