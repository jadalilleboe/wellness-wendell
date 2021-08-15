import React, { useState } from 'react'
import Button from 'react-bootstrap/button'
import Messages from './dashboardComponents/Messages'
import AccountSettings from './dashboardComponents/AccountSettings'

const Dashboard = () => {
    const [ display, setDisplay ] = useState('messages')

    return (
        <div className='dashboard'>
            <div className='dashboard-nav'>
                <Button className='db-button' onClick={() => setDisplay('messages')}>Change Wendell's messages</Button>
                <Button className='db-button' onClick={() => setDisplay('settings')}>Account Settings</Button>
            </div>
            <div className='dashboard-content'>
                <Messages display={display}/>
                <AccountSettings display={display} />
            </div>
        </div>
    )
}

export default Dashboard