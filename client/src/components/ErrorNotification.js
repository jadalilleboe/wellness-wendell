import React from 'react'

const ErrorNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="alert alert-danger">
            {message}
        </div>
    )
}

export default ErrorNotification