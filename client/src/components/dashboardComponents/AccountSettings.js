import React, { useState, useEffect } from 'react'
import { usePhoneNumber } from '../hooks/usePhoneNumber'
import { useHistory } from 'react-router-dom'
import {Button, Modal} from 'react-bootstrap'
import SuccessNotification from '../SuccessNotification'
import userService from '../../services/users'

const AccountSettings = ({ display }) => {
    const [ successMessage, setSuccessMessage ] = useState(null)
    const [ phoneNumber, setPhoneNumber ] = useState('')
    const [ phoneValues, handleNumberChange ] = usePhoneNumber({ areaPrefix: '+1', first3: '', middle3: '', last4: '' })
    const [show, setShow] = useState(false)

    const history = useHistory()

    useEffect(() => {
        setPhoneNumber(phoneValues.areaPrefix +  phoneValues.first3 + phoneValues.middle3 + phoneValues.last4)
    }, [phoneValues.areaPrefix, phoneValues.first3, phoneValues.middle3, phoneValues.last4])

    const handleNewNumber = () => {
        userService.updatePhoneNumber(phoneNumber)
        setSuccessMessage('Updated successfully.')
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)
    }

    const handleDelete = async () => {
        await userService.deleteUser()
        window.localStorage.removeItem('loggedWWUser')
        history.push('/delete')
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    if (display === 'settings') {
        return (
            <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete your account?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This is a permanent, destructive action.</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleDelete}>
                    Delete Account
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <h1 className='subheading'>Settings</h1>
            <SuccessNotification message={successMessage}/>
            <div>
                <span style={{paddingLeft: 5}}><label>Change Phone Number</label></span>
                <span style={{paddingRight: 5, paddingLeft: 5}}><select name='areaPrefix' onChange={handleNumberChange}>
                    <option value='+1'>+1</option>
                    <option value='+44'>+44</option>
                </select></span>
                <input pattern='[0-9]{3}' type='tel' maxLength='3' style={{width: '50px'}} required name='first3' onChange={handleNumberChange}/>-
                <input type='tel' maxLength='3' pattern='[0-9]{3}' style={{width: '50px'}} required name='middle3' onChange={handleNumberChange}/>- 
                <input type='tel' maxLength='4' pattern='[0-9]{4}' style={{width: '60px'}} required name='last4' onChange={handleNumberChange}/>
                <button class ='btn mb-2 ml-2 mr-2' onClick={handleNewNumber}>Save</button>
            </div>
            <div className='text-center m-3'>
            <Button className='text-center'onClick={handleShow}>Delete account</Button></div>
            </>
        )
    } else {
        return null
    }
}

export default AccountSettings