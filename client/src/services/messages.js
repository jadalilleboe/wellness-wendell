import axios from 'axios'
const baseUrl = '/api/messages'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getUserMessages = async () => {
    try { const response = await axios.get(baseUrl, { headers: { 'Authorization': token } })
    return response.data
    } catch {
        return null
    }
} 

const saveMessage = async messageObject => {
    const response = await axios.put(baseUrl, messageObject, { headers: { 'Authorization' : token } })
    return response.data
}

const deleteMessage = async messageID => {
    const response = await axios.delete(`${baseUrl}/${messageID}`, { headers: { 'Authorization' : token } })
    return response.data
}

const messageService = { setToken, token, getUserMessages, saveMessage, deleteMessage }

export default messageService