import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { usePhoneNumber } from './hooks/usePhoneNumber'
import { useForm } from './hooks/useForm'
import Button from 'react-bootstrap/button'
import twilioService from '../services/twilio'
import userService from '../services/users'
import loginService from '../services/login'
import messageService from '../services/messages'
import ErrorNotification from './ErrorNotification'
import { v4 as uuidv4 } from 'uuid'

const SignUpPage = () => {
    const [ values, handleChange ] = useForm({ firstName: '', lastName: '', email: '', password: '', retypedPassword: ''})
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ phoneValues, handleNumberChange ] = usePhoneNumber({ areaPrefix: '+1', first3: '', middle3: '', last4: '' })
    const [ submitted, setSubmitted ] = useState(false)
    const [ code, setCode ] = useState(0)
    const [ userInputtedCode, setUserInputtedCode ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState(null)
    const [ passwordVisibility, setPasswordVisibility ] = useState('password')

    const history = useHistory()
    
    useEffect(() => {
        setPhoneNumber(phoneValues.areaPrefix +  phoneValues.first3 + phoneValues.middle3 + phoneValues.last4)
    }, [phoneValues.areaPrefix, phoneValues.first3, phoneValues.middle3, phoneValues.last4])
    
    const handleSignup = async (event) => {
        setErrorMessage(null)
        event.preventDefault()

        if (values.password !== values.retypedPassword) {
            setErrorMessage("Passwords don't match, please try again.")
        } else if (values.password.length < 8 ){
            setErrorMessage('Password must be at least 8 characters long.')
        } else {
            const checkUniqueEmail = await userService.verifyUniqueEmail(values.email)
            if (!checkUniqueEmail) {
                setErrorMessage(null)
                setSubmitted(true)
                twilioService.sendMessage(phoneNumber)
                .then(code => {
                    setCode(code)
                })
            } else {
                setErrorMessage("A Wellness Wendell account has already been registered with that e-mail address.")
            }
        }
    }
    
    const handleCodeEntry = async (event) => {
        event.preventDefault()
        if (parseInt(userInputtedCode) === code) {
            history.push({
                pathname: '/welcome', 
                state: { 
                    name: values.firstName 
                }
            })
            await userService.createUser({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                phoneNumber: phoneNumber
            })
            const user = await loginService.login({
                email: values.email, password: values.password
            })
            messageService.setToken(user.token)
            const usersCurrentDate = new Date()
            const messageDate = new Date(usersCurrentDate.getFullYear(), usersCurrentDate.getMonth(), usersCurrentDate.getDate(), 9, 0)
            messageService.saveMessage({
                messageid: String(uuidv4()),
                message: `Hi ${values.firstName}! Just checking in you to see how you are... Have a good day! Love, Wellness Wendell`,
                timeDisplayMinutes: ':00',
                timeDisplayHours: 9,
                timeOfDay: 'AM',
                UTCHours: messageDate.getUTCHours(),
                UTCMinutes: 0
            })
            messageService.saveMessage({
                messageid: String(uuidv4()),
                message: `${values.firstName}, don't forget to drink some water today! Being hydrated is extremely important to your overall well-being :) Hope your day's going well! Love, Wellness Wendell`,
                timeDisplayMinutes: ':00',
                timeDisplayHours: 1,
                timeOfDay: 'PM',
                UTCHours: messageDate.getUTCHours() + 4,
                UTCMinutes: 0
            })
            messageService.saveMessage({
                messageid: String(uuidv4()),
                message: `Remember to get some sort of exercise in today, ${values.firstName}! I recommend doing some yoga or going for a walk. Being active is a key component of physical and mental wellbeing! Love, Wellness Wendell`,
                timeDisplayMinutes: ':00',
                timeDisplayHours: 5,
                timeOfDay: 'PM',
                UTCHours: messageDate.getUTCHours() + 8,
                UTCMinutes: 0
            })
        } else {
            setErrorMessage('The code is not correct. Please try again.')
            setUserInputtedCode('')
        }
    }

    const handleResend = () => {
        twilioService.sendMessage(phoneNumber)
        .then(code => {
            setCode(code)
        })
    }

    if (!submitted) {
        return (
            <div className='container' style={{marginBottom: 20}}>
                <h1 className='subheading'>Sign up to get messages from Wellness Wendell :)</h1>
                <div className='form'>
                <form className='container-sm text-left' onSubmit={handleSignup}>
                    <div className='form-group'>
                        <label>First Name</label>
                        <input value={values.firstName} onChange={handleChange} placeholder='John' name='firstName' required style={{width: '100%', clear: 'both'}}></input>
                    </div>
                    <div className='form-group'>
                        <label>Last Name</label>
                        <span className='text-center'>
                        <input value={values.lastName} onChange={handleChange} placeholder='Smith' name='lastName' required></input>
                        </span>
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input value={values.email} type='email' onChange={handleChange} placeholder='johnsmith@gmail.com' name='email' required></input>
                    </div>
                    <ErrorNotification message={errorMessage} />
                    <div className='form-group'>
                        <label>Password</label>
                        <input type={passwordVisibility} onChange={handleChange} name='password'/>
                        <span className='show-btn' onClick={() => passwordVisibility === 'password' ? setPasswordVisibility('text') : setPasswordVisibility('password')}>{passwordVisibility === 'password' ? 'Show' : 'Hide'}</span>
                    </div>
                    <div className='form-group'>
                        <label>Re-Type Password</label>
                        <input type={passwordVisibility} onChange={handleChange} name='retypedPassword'/>
                        <span className='show-btn' onClick={() => passwordVisibility === 'password' ? setPasswordVisibility('text') : setPasswordVisibility('password')}>{passwordVisibility === 'password' ? 'Show' : 'Hide'}</span>
                    </div>
                    <div className='form-group'>
                        <span style={{paddingRight: 5}}><label>Phone Number</label></span>
                        <span style={{paddingRight: 5}}><select onChange={handleNumberChange} name='areaPrefix'>
                            <option value='+1'>+1</option>
                            <option value='+44'>+44</option>
                        </select></span>
                        <input pattern='[0-9]{3}' type='tel' maxLength='3' placeholder='888' style={{width: '50px'}} required onChange={handleNumberChange} name='first3'/>-
                        <input type='tel' maxLength='3' pattern='[0-9]{3}' placeholder='888' style={{width: '50px'}} required onChange={handleNumberChange} name='middle3'/>- 
                        <input type='tel' maxLength='4' pattern='[0-9]{4}' placeholder='8888' style={{width: '60px'}} required onChange={handleNumberChange} name='last4'/>
                    </div>
                    <div className='submit-button text-center'>
                        <Button type='submit' class='btn'>Submit</Button>
                    </div>
                </form>
                </div>
            </div>
        )
    } else {
        return (
            <div className='text-center'>
                <h1 className='subheading'>Hi {values.firstName}!</h1>
                <p>We've sent a one-time code to your phone number.</p>
                <ErrorNotification message={errorMessage} />
                <form onSubmit={handleCodeEntry}>
                    <label>Please enter the code to verify your phone number: </label>
                    <span style={{paddingLeft: 10}}><input value={userInputtedCode} maxLength='4' onChange={({ target }) => setUserInputtedCode(target.value)}/></span>
                    <Button onClick={handleResend} className='m-3'>Resend Code</Button><br />
                <Button type='submit' className='m-2'>Submit</Button>
                </form>
            </div>
        )
    }
}

export default SignUpPage