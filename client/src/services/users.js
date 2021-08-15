import axios from 'axios'
const baseUrl = '/api/users'


const createUser = async userObject => {
    const response = await axios.post(baseUrl, userObject)
    return response.data
}

const updatePhoneNumber = async newNumber => {
    let token = window.localStorage.getItem('loggedWWUser') ? `bearer ${JSON.parse(window.localStorage.getItem('loggedWWUser')).token}` : null
    const response = await axios.put(baseUrl, {newNumber: newNumber}, { headers: { 'Authorization': token } })
    return response.data
}   

const deleteUser = async () => {
    let token = window.localStorage.getItem('loggedWWUser') ? `bearer ${JSON.parse(window.localStorage.getItem('loggedWWUser')).token}` : null
    const response = await axios.delete(baseUrl, { headers: { 'Authorization': token } })
    return response.data
}

const verifyUniqueEmail = async email => {
    const response = await axios.post(`${baseUrl}/verify`, {thisemail: email})
    return response.data
}

const userService = {
    createUser,
    updatePhoneNumber,
    deleteUser,
    verifyUniqueEmail
}

export default userService