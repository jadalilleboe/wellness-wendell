import React, { useState, useEffect } from 'react'
import SuccessNotification from '../SuccessNotification'
import messageService from '../../services/messages'
import { v4 as uuidv4 } from 'uuid'
import { useTime } from '../hooks/useTime'

const convert12HourClock = (hour, timeOfDay) => {
    if (hour === 12 && timeOfDay === 'AM') {
        return 24
    } else if (hour !== 12 && timeOfDay === 'PM') {
        return 12 + hour
    } else {
        return hour
    }
}

const Message = ({ id, message, timeDisplayHours, timeDisplayMinutes, timeOfDay,currentMessages, setCurrentMessages, handleDeletedMessage }) => {
    const [ editedMessage, setEditedMessage ] = useState(message)
    const [ successMessage, setSuccessMessage ] = useState(null)
    const [ timeValues, handleChange ] = useTime({ timeDisplayHours: timeDisplayHours, timeDisplayMinutes: timeDisplayMinutes, timeOfDay: timeOfDay})
    const [ UTCHours, setUTCHours ] = useState(null)
    const [ UTCMinutes, setUTCMinutes ] = useState(null)

    useEffect(() => {
        const date = new Date()
        const minutes = timeValues.timeDisplayMinutes === ':00' ? 0 : 30
        const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), convert12HourClock(timeValues.timeDisplayHours, timeValues.timeOfDay), minutes)
        setUTCHours(messageDate.getUTCHours())
        setUTCMinutes(minutes)
    }, [timeValues])

    const handleSave = () => {
        messageService.saveMessage({
            messageid: id,
            message: editedMessage,
            timeDisplayMinutes: timeValues.timeDisplayMinutes,
            timeDisplayHours: timeValues.timeDisplayHours,
            timeOfDay: timeValues.timeOfDay,
            UTCHours: UTCHours,
            UTCMinutes: UTCMinutes
        })
        setSuccessMessage('Message saved.')
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)
    }

    const handleDelete = () => {
        if (window.confirm("Delete message?")) {
            handleDeletedMessage()
            messageService.deleteMessage(id)
            setCurrentMessages(currentMessages.filter(message => message.messageid !== id))
        }
    }

    return (
        <div className="msg">
            <SuccessNotification message={successMessage} />
            <span style={{marginTop: 20}}><textarea type="text" value={editedMessage} style={{width: '100%'}} onChange={({ target }) => setEditedMessage(target.value)}/></span>
            <select name="timeDisplayHours" defaultValue={timeValues.timeDisplayHours} onChange={handleChange} className='ml-2'>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(time => {
                    return (<option value={time} key={time}>{time}</option>)
                })}
            </select>
            <select name="timeDisplayMinutes" onChange={handleChange} defaultValue={timeValues.timeDisplayMinutes}>
                <option value=":00">:00</option>
                <option value=":30">:30</option>
            </select>
            <select name="timeOfDay" onChange={handleChange} defaultValue={timeValues.timeOfDay}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <button className='btn m-2' onClick={handleSave}>Save Message</button>
            <button className='btn' onClick={handleDelete}>Delete Message</button>
        </div>
    )
}

const Messages = ({ display }) => {
    const [ currentMessages, setCurrentMessages ] = useState([])
    const [ outerSuccessMessage, setOuterSuccessMessage ] = useState(null)
    
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedWWUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            messageService.setToken(user.token)
        }
      }, [])
      
    useEffect(() => {
        messageService.getUserMessages().then(messages => setCurrentMessages(messages))
    }, [])

    const handleNewMessage = () => {
        setCurrentMessages([...currentMessages, {message: '', messageid: String(uuidv4()), timeDisplayHours: 9, timeDisplayMinutes: ':00', timeOfDay: 'AM'}])
    }

    const handleDeletedMessage = () => {
        setOuterSuccessMessage('Message deleted.')
        setTimeout(() => {
            setOuterSuccessMessage(null)
        }, 5000)
    }

    if (display === 'messages' && currentMessages.length !== 0) {
        return (
            <div>
            <h1 className='subheading'>Messages</h1>
            <SuccessNotification message={outerSuccessMessage}/>
            {currentMessages.map((message, index) =>
                <Message key={index} id={message.messageid} message={message.message} timeDisplayHours={message.timeDisplayHours} timeDisplayMinutes={message.timeDisplayMinutes} timeOfDay={message.timeOfDay} currentMessages={currentMessages} setCurrentMessages={updatedMessages => setCurrentMessages(updatedMessages)} handleDeletedMessage={handleDeletedMessage}/>
                )}
            <button className='btn m-2' onClick={handleNewMessage}>Add new message</button>
            </div>
        
        )
    } else if (display === 'messages' && currentMessages.length === 0) {
        return (
            <>
            <SuccessNotification message={outerSuccessMessage}/>
            <h1 className='subheading'>Messages</h1>
            <p class='m-2'>You currently don't have any Wellness Wendell messages.</p>
            <button class='btn m-2' onClick={handleNewMessage}>Add new message</button>
            </>
        )
    }
    else {
        return null
    }
}

export default Messages