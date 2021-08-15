import React from 'react'

const SuccessNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="alert alert-primary">
            {message}
        </div>
    )
}

export default SuccessNotification