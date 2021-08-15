import axios from 'axios'
const baseUrl = '/api/text-messages'

const sendMessage = async number => {
    const response = await axios.post(baseUrl, { number: number })
    return response.data.code
}

const services = { sendMessage }

export default services